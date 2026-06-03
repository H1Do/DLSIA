import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesQueryDto } from './dto/articles-query.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto, authorId: number) {
    return this.prisma.article.create({
      data: { ...dto, authorId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findAll(query: ArticlesQueryDto, currentUserId?: number) {
    const { search, page = 1, limit = 9 } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const where = {
      OR: [
        { published: true },
        ...(currentUserId ? [{ published: false, authorId: currentUserId }] : []),
      ],
      ...(search
        ? {
            AND: [
              {
                OR: [
                  { title: { contains: search, mode: 'insensitive' as const } },
                  { description: { contains: search, mode: 'insensitive' as const } },
                  {
                    author: {
                      OR: [
                        { name: { contains: search, mode: 'insensitive' as const } },
                        { email: { contains: search, mode: 'insensitive' as const } },
                      ],
                    },
                  },
                ],
              },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.article.findMany({
        where,
        include: { author: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
      }),
      this.prisma.article.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number, currentUserId?: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!article) throw new NotFoundException(`Статья #${id} не найдена`);
    if (!article.published && article.authorId !== currentUserId) {
      throw new NotFoundException(`Статья #${id} не найдена`);
    }
    return article;
  }

  async update(id: number, dto: UpdateArticleDto, currentUserId: number) {
    const article = await this.findOne(id, currentUserId);
    if (article.authorId !== currentUserId) {
      throw new ForbiddenException('Вы не можете редактировать эту статью');
    }
    return this.prisma.article.update({ where: { id }, data: dto });
  }

  async remove(id: number, currentUserId: number) {
    const article = await this.findOne(id, currentUserId);
    if (article.authorId !== currentUserId) {
      throw new ForbiddenException('Вы не можете удалить эту статью');
    }
    return this.prisma.article.delete({ where: { id } });
  }
}