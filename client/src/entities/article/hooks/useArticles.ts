import { useQueryClient } from '@tanstack/react-query';
import {
  useGetAllArticles,
  useCreateArticle,
  getGetAllArticlesQueryKey,
} from '../../../shared/api/generated';
import type { GetAllArticlesParams } from '../../../shared/api/generated';

export const useArticles = (params?: GetAllArticlesParams) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllArticles(params, {});
  const articles = data?.data?.data ?? [];
  const total = data?.data?.total ?? 0;
  const page = data?.data?.page ?? 1;
  const limit = data?.data?.limit ?? 9;

  const { mutate: createArticle, isPending: isCreating } = useCreateArticle({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getGetAllArticlesQueryKey(params),
        });
      },
    },
  });

  return { articles, total, page, limit, isLoading, createArticle, isCreating };
};