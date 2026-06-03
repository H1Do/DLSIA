import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Comment } from '@prisma/client';

class CommentAuthor {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ nullable: true })
  name: string | null;

  @ApiProperty()
  email: string;
}

export class CommentEntity implements Comment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  body: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  articleId: number;

  @ApiProperty()
  authorId: number;

  @ApiPropertyOptional({ type: () => CommentAuthor })
  author?: CommentAuthor;
}