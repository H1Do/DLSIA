import { useState } from 'react';
import { Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ArticleForm } from '../../ui/ArticleForm';
import { useArticle } from '../../../../entities/article';
import type { ArticleEntity } from '../../../../shared/api/model';

interface Props {
  article: ArticleEntity;
}

export const EditArticleButton = ({ article }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateArticle, isUpdating } = useArticle(Number(article.id));

  return (
    <>
      <Button
        icon={<EditOutlined />}
        size="small"
        onClick={() => setIsOpen(true)}
      >
        Редактировать
      </Button>

      <Modal
        title="Редактировать статью"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <ArticleForm
          onSubmit={(values) => {
            updateArticle(
              { id: Number(article.id), data: values },
              { onSuccess: () => setIsOpen(false) },
            );
          }}
          isLoading={isUpdating}
          initialValues={{
            title: String(article.title),
            description: article.description ? String(article.description) : undefined,
            body: String(article.body),
            published: Boolean(article.published),
          }}
        />
      </Modal>
    </>
  );
};