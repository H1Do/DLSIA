import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto, authorId: number) {
    return this.prisma.article.create({
      data: { ...dto, authorId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findAll(currentUserId?: number) {
    return this.prisma.article.findMany({
      where: {
        OR: [
          { published: true },
          // свои черновики видны только автору
          ...(currentUserId ? [{ published: false, authorId: currentUserId }] : []),
        ],
      },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, currentUserId?: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!article) throw new NotFoundException(`Статья #${id} не найдена`);
    // черновик виден только автору
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