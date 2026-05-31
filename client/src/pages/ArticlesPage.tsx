import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Button,
  Card,
  Col,
  Empty,
  Modal,
  Row,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuthStore } from '../shared/store/useAuthStore';
import { ArticleForm } from '../features/articles/ui/ArticleForm';
import { useGetAllArticles, useCreateArticle } from '../shared/api/generated';

const { Title, Paragraph, Text } = Typography;

export const ArticlesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetAllArticles();
  const articles = data?.data ?? [];

  const { mutate: createArticle, isPending } = useCreateArticle({
    mutation: {
      onSuccess: () => {
        setIsModalOpen(false);
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

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Статьи
        </Title>
        {user && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Написать статью
          </Button>
        )}
      </div>

      {articles.length === 0 ? (
        <Empty description="Статей пока нет" />
      ) : (
        <Row gutter={[16, 16]}>
          {articles.map((article) => (
            <Col xs={24} sm={12} lg={8} key={String(article.id)}>
              <Card
                title={String(article.title)}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate({
                    to: '/article/$id',
                    params: { id: String(article.id) },
                  })
                }
                extra={
                  <Tag color={article.published ? 'green' : 'orange'}>
                    {article.published ? 'Опубликовано' : 'Черновик'}
                  </Tag>
                }
              >
                {article.description && (
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {String(article.description)}
                  </Paragraph>
                )}
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Автор: {String(article.author?.name ?? article.author?.email ?? '—')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Новая статья"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <ArticleForm
          onSubmit={(values) => createArticle({ data: values })}
          isLoading={isPending}
        />
      </Modal>
    </div>
  );
};