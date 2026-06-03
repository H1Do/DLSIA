import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto, authorId: number) {
    return this.prisma.comment.create({
      data: { body: dto.body, articleId: dto.articleId, authorId },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
  }

  async findByArticle(articleId: number) {
    return this.prisma.comment.findMany({
      where: { articleId },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async remove(id: number, currentUserId: number) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Комментарий не найден');
    if (comment.authorId !== currentUserId) {
      throw new ForbiddenException('Вы не можете удалить этот комментарий');
    }
    return this.prisma.comment.delete({ where: { id } });
  }
}