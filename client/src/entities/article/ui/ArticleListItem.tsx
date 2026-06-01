import { Tag, Typography } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import type { ArticleEntity } from '../../../shared/api/model';

const { Text, Paragraph } = Typography;

interface Props {
  article: ArticleEntity;
}

export const ArticleListItem = ({ article }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate({ to: '/article/$id', params: { id: String(article.id) } })
      }
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div style={{ flex: 1 }}>
        <Text strong style={{ fontSize: 16 }}>
          {String(article.title)}
        </Text>
        {article.description && (
          <Paragraph
            ellipsis={{ rows: 1 }}
            type="secondary"
            style={{ margin: '4px 0 0' }}
          >
            {String(article.description)}
          </Paragraph>
        )}
        <Text type="secondary" style={{ fontSize: 12 }}>
          Автор: {String(article.author?.name ?? article.author?.email ?? '—')}
        </Text>
      </div>
      <Tag color={article.published ? 'green' : 'orange'}>
        {article.published ? 'Опубликовано' : 'Черновик'}
      </Tag>
    </div>
  );
};