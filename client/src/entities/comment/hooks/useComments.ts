import { useQueryClient } from '@tanstack/react-query';
import {
  useGetCommentsByArticle,
  useCreateComment,
  useDeleteComment,
  getGetCommentsByArticleQueryKey,
} from '../../../shared/api/generated';

export const useComments = (articleId: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetCommentsByArticle(articleId);
  const comments = data?.data ?? [];

  const invalidate = () => {
    void queryClient.invalidateQueries({
      queryKey: getGetCommentsByArticleQueryKey(articleId),
    });
  };

  const { mutate: createComment, isPending: isCreating } = useCreateComment({
    mutation: { onSuccess: invalidate },
  });

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment({
    mutation: { onSuccess: invalidate },
  });

  return { comments, isLoading, createComment, isCreating, deleteComment, isDeleting };
};