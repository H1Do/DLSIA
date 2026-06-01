import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import { useArticle } from '../../../../entities/article';

interface Props {
  articleId: number;
}

export const DeleteArticleButton = ({ articleId }: Props) => {
  const navigate = useNavigate();
  const { deleteArticle, isDeleting } = useArticle(articleId);

  return (
    <Popconfirm
      title="Удалить статью?"
      description="Это действие нельзя отменить"
      okText="Удалить"
      cancelText="Отмена"
      okType="danger"
      onConfirm={() =>
        deleteArticle(
          { id: articleId },
          { onSuccess: () => navigate({ to: '/articles' }) },
        )
      }
    >
      <Button icon={<DeleteOutlined />} size="small" danger loading={isDeleting}>
        Удалить
      </Button>
    </Popconfirm>
  );
};