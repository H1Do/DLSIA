import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ArticleForm } from '../../ui/ArticleForm';
import { useArticles } from '../../../../entities/article';
import type { GetAllArticlesParams } from '../../../../shared/api/generated';

interface Props {
  params?: GetAllArticlesParams;
}

export const CreateArticleButton = ({ params }: Props = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createArticle, isCreating } = useArticles(params);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Написать статью
      </Button>

      <Modal
        title="Новая статья"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <ArticleForm
          onSubmit={(values) => {
            createArticle(
              { data: values },
              { onSuccess: () => setIsOpen(false) },
            );
          }}
          isLoading={isCreating}
        />
      </Modal>
    </>
  );
};