import { Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useArticle } from '../../../../entities/article';
import type { ArticleEntity } from '../../../../shared/api/model';
import useApp from 'antd/es/app/useApp';

interface Props {
  article: ArticleEntity;
}

export const PublishArticleButton = ({ article }: Props) => {
  const { modal } = useApp();
  const { updateArticle, isUpdating } = useArticle(Number(article.id));

  const handlePublish = () => {
    modal.confirm({
      title: 'Опубликовать статью?',
      content: 'Статья станет доступна всем пользователям.',
      okText: 'Опубликовать',
      cancelText: 'Отмена',
      okType: 'primary',
      onOk: () => {
        updateArticle({
          id: Number(article.id),
          data: { published: true },
        });
      },
    });
  };

  if (article.published) return null;

  return (
    <Button
      icon={<CheckOutlined />}
      size="small"
      type="primary"
      loading={isUpdating}
      onClick={handlePublish}
    >
      Опубликовать
    </Button>
  );
};