import { createFileRoute } from '@tanstack/react-router';
import { ArticlePage } from '../../pages/ArticlePage';

export const Route = createFileRoute('/_authorized/article/$id')({
  component: ArticlePage,
});