import { useParams, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuthStore } from '../shared/store/useAuthStore';
import { ArticleForm } from '../features/articles/ui/ArticleForm';
import { useGetArticle, useUpdateArticle, useDeleteArticle } from '../shared/api/generated';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Popconfirm, Space, Spin, Tag, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const ArticlePage = () => {
  const { id } = useParams({ from: '/_authorized/article/$id' });
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isLoading, refetch } = useGetArticle(Number(id));
  const article = data?.data;

  const { mutate: updateArticle, isPending } = useUpdateArticle({
    mutation: {
      onSuccess: () => {
        setIsEditOpen(false);
        void refetch();
      },
    },
  });
  const { mutate: deleteArticle, isPending: isDeleting } = useDeleteArticle({
    mutation: {
        onSuccess: () => {
            navigate({ to: '/articles' });
        },
    },
  });
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!article) return null;

  const isAuthor = user?.id === article.authorId;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        type="text"
        onClick={() => navigate({ to: '/articles' })}
        style={{ marginBottom: 16 }}
      >
        Назад
      </Button>

      <Space style={{ marginBottom: 8 }}>
        <Tag color={article.published ? 'green' : 'orange'}>
          {article.published ? 'Опубликовано' : 'Черновик'}
        </Tag>
            {isAuthor && (
            <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => setIsEditOpen(true)}
            >
            Редактировать
        </Button>
        )}
        {isAuthor && (
            <Popconfirm
                title="Удалить статью?"
                description="Это действие нельзя отменить"
                okText="Удалить"
                cancelText="Отмена"
                okType="danger"
                onConfirm={() => deleteArticle({ id: Number(id) })}
            >
                <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    loading={isDeleting}
                >
                Удалить
                </Button>
            </Popconfirm>
            )}
      </Space>

      <Title>{String(article.title)}</Title>

      <Text type="secondary">
        Автор: {String(article.author?.name ?? article.author?.email ?? '—')}
        {' · '}
        {new Date(String(article.createdAt)).toLocaleDateString('ru-RU')}
      </Text>

      <Divider />

      {article.description && (
        <Paragraph strong>{String(article.description)}</Paragraph>
      )}

      <Paragraph>{String(article.body)}</Paragraph>

      <Modal
        title="Редактировать статью"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
        destroyOnClose
      >
        <ArticleForm
          onSubmit={(values) =>
            updateArticle({ id: Number(id), data: values })
          }
          isLoading={isPending}
          initialValues={{
            title: String(article.title),
            description: article.description
              ? String(article.description)
              : undefined,
            body: String(article.body),
            published: Boolean(article.published),
          }}
        />
      </Modal>
    </div>
  );
};