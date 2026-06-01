import { useQueryClient } from '@tanstack/react-query';
import {
  useGetArticle,
  useUpdateArticle,
  useDeleteArticle,
} from '../../../shared/api/generated';

export const useArticle = (id: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useGetArticle(id);
  const article = data?.data;

  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle({
    mutation: {
      onSuccess: () => {
        void refetch();
        void queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      },
    },
  });

  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      },
    },
  });

  return { article, isLoading, updateArticle, isUpdating, deleteArticle, isDeleting };
};