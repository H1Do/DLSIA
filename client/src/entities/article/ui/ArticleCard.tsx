import { Card, Col, Tag, Typography } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import type { ArticleEntity } from '../../../shared/api/model';

const { Paragraph, Text } = Typography;

interface Props {
  article: ArticleEntity;
}

export const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        title={String(article.title)}
        style={{ cursor: 'pointer' }}
        onClick={() => navigate({ to: '/article/$id', params: { id: String(article.id) } })}
        extra={
          <Tag color={article.published ? 'green' : 'orange'}>
            {article.published ? 'Опубликовано' : 'Черновик'}
          </Tag>
        }
      >
        {article.description && (
          <Paragraph ellipsis={{ rows: 2 }}>{String(article.description)}</Paragraph>
        )}
        <Text
          type="secondary"
          style={{ fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
          onClick={(e) => {
            e.stopPropagation();
            navigate({ to: '/profile/$id', params: { id: String(article.author?.id) } });
          }}
        >
          Автор: {String(article.author?.name ?? article.author?.email ?? '—')}
        </Text>
      </Card>
    </Col>
  );
};