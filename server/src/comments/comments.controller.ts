import {
  Body, Controller, Delete, Get, Param,
  ParseIntPipe, Post, Request, UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createComment' })
  @ApiResponse({ status: 201, type: CommentEntity })
  create(@Body() dto: CreateCommentDto, @CurrentUser() user: User) {
    return this.commentsService.create(dto, user.id);
  }

  @Get('article/:articleId')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ operationId: 'getCommentsByArticle' })
  @ApiResponse({ status: 200, type: CommentEntity, isArray: true })
  findByArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.commentsService.findByArticle(articleId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'deleteComment' })
  @ApiResponse({ status: 200, type: CommentEntity })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.commentsService.remove(id, user.id);
  }
}