import {
  Body, Controller, Delete, Get, Param,
  ParseIntPipe, Patch, Post, Query, Request, UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesQueryDto } from './dto/articles-query.dto';
import { ArticlesResponseDto } from './dto/articles-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'createArticle' })
  @ApiResponse({ status: 201, type: ArticleEntity })
  create(@Body() dto: CreateArticleDto, @CurrentUser() user: User) {
    return this.articlesService.create(dto, user.id);
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ operationId: 'getAllArticles' })
  @ApiResponse({ status: 200, type: ArticlesResponseDto })
  findAll(@Query() query: ArticlesQueryDto, @Request() req: { user?: User }) {
    return this.articlesService.findAll(query, req.user?.id);
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ operationId: 'getArticle' })
  @ApiResponse({ status: 200, type: ArticleEntity })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: { user?: User }) {
    return this.articlesService.findOne(id, req.user?.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'updateArticle' })
  @ApiResponse({ status: 200, type: ArticleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
    @CurrentUser() user: User,
  ) {
    return this.articlesService.update(id, dto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'deleteArticle' })
  @ApiResponse({ status: 200, type: ArticleEntity })
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.articlesService.remove(id, user.id);
  }
}