import { useQueryClient } from '@tanstack/react-query';
import {
  useGetAllArticles,
  useCreateArticle,
} from '../../../shared/api/generated';

export const useArticles = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllArticles();
  const articles = data?.data ?? [];

  const { mutate: createArticle, isPending: isCreating } = useCreateArticle({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      },
    },
  });

  return { articles, isLoading, createArticle, isCreating };
};