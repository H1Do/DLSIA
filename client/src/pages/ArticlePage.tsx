import { useParams, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../shared/store/useAuthStore';
import { useArticle } from '../entities/article';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Space, Spin, Tag, Typography } from 'antd';
import { EditArticleButton } from '../features/articles/edit-article/ui/EditArticleButton';
import { DeleteArticleButton } from '../features/articles/delete-article/ui/DeleteArticleButton';
import { PublishArticleButton } from '../features/articles/publish-article/ui/PublishArticleButton';
import { CommentSection } from '../features/comments/ui/CommentSection';

const { Title, Paragraph, Text } = Typography;

export const ArticlePage = () => {
  const { id } = useParams({ from: '/_public/article/$id' });
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { article, isLoading } = useArticle(Number(id));

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
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
        {isAuthor && <PublishArticleButton article={article} />}
        {isAuthor && <EditArticleButton article={article} />}
        {isAuthor && <DeleteArticleButton articleId={Number(article.id)} />}
      </Space>

      <Title>{String(article.title)}</Title>

      <Text type="secondary">
        Автор:{' '}
        <span
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate({ to: '/profile/$id', params: { id: String(article.author?.id) } })}
        >
          {String(article.author?.name ?? article.author?.email ?? '—')}
        </span>
        {' · '}
        {new Date(String(article.createdAt)).toLocaleDateString('ru-RU')}
      </Text>

      <Divider />

      {article.description && (
        <Paragraph strong>{String(article.description)}</Paragraph>
      )}

      <Paragraph>{String(article.body)}</Paragraph>
      <CommentSection articleId={Number(id)} />
    </div>
  );
};