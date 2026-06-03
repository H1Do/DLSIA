import { ApiProperty } from '@nestjs/swagger';
import { ArticleEntity } from '../entities/article.entity';

export class ArticlesResponseDto {
  @ApiProperty({ type: [ArticleEntity] })
  data: ArticleEntity[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}