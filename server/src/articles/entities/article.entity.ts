import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Article } from '@prisma/client';

class ArticleAuthor {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ nullable: true })
  name: string | null;

  @ApiProperty()
  email: string;
}

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional({ nullable: true })
  authorId: number | null;

  @ApiPropertyOptional({ nullable: true, type: () => ArticleAuthor })
  author?: ArticleAuthor | null;
}