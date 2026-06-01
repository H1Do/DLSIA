import { useArticles } from './useArticles';

export const useUserArticles = (userId: number) => {
  const { articles, isLoading } = useArticles();

  const userArticles = articles.filter(
    (a) => Number(a.author?.id) === userId,
  );

  const published = userArticles.filter((a) => a.published);
  const drafts = userArticles.filter((a) => !a.published);

  return { userArticles, published, drafts, isLoading };
};