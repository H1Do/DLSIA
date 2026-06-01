import { useState } from 'react';
import { Row, Spin, Empty, Typography, Button, Tooltip } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useAuthStore } from '../shared/store/useAuthStore';
import { useArticles, ArticleCard, ArticleListItem } from '../entities/article';
import { CreateArticleButton } from '../features/articles/create-article/ui/CreateArticleButton';

const { Title } = Typography;

type ViewMode = 'grid' | 'list';

export const ArticlesPage = () => {
  const { user } = useAuthStore();
  const { articles, isLoading } = useArticles();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Tooltip title="Карточки">
            <Button
              type={viewMode === 'grid' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode('grid')}
            />
          </Tooltip>
          <Tooltip title="Список">
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<UnorderedListOutlined />}
              onClick={() => setViewMode('list')}
            />
          </Tooltip>
          {user && <CreateArticleButton />}
        </div>
      </div>

      {articles.length === 0 ? (
        <Empty description="Статей пока нет" />
      ) : viewMode === 'grid' ? (
        <Row gutter={[16, 16]}>
          {articles.map((article) => (
            <ArticleCard key={String(article.id)} article={article} />
          ))}
        </Row>
      ) : (
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8 }}>
          {articles.map((article) => (
            <ArticleListItem key={String(article.id)} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};