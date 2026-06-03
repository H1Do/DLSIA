import { useState } from 'react';
import { Row, Empty, Button, Tooltip, Pagination } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ArticleCard, ArticleListItem } from '../../entities/article';
import type { ArticleEntity } from '../../shared/api/model';

type ViewMode = 'grid' | 'list';

interface Props {
  articles: ArticleEntity[];
  total: number;
  page: number;
  limit: number;
  search: string;
  onPageChange: (page: number) => void;
}

export const ArticlesList = ({ articles, total, page, limit, search, onPageChange }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 8 }}>
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
      </div>

      {articles.length === 0 ? (
        <Empty
          description={search ? `Ничего не найдено по запросу «${search}»` : 'Статей пока нет'}
        />
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

      {total > limit && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={onPageChange}
            showSizeChanger={false}
            showTotal={(t, range) => `${range[0]}–${range[1]} из ${t}`}
          />
        </div>
      )}
    </div>
  );
};