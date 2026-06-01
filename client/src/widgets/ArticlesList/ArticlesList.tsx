import { useState, useMemo } from 'react';
import { Row, Empty, Button, Tooltip, Pagination } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { ArticleCard, ArticleListItem } from '../../entities/article';
import type { ArticleEntity } from '../../shared/api/model';

type ViewMode = 'grid' | 'list';

const PAGE_SIZE_GRID = 9;
const PAGE_SIZE_LIST = 10;

interface Props {
  articles: ArticleEntity[];
  search: string;
}

export const ArticlesList = ({ articles, search }: Props) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);

  const pageSize = viewMode === 'grid' ? PAGE_SIZE_GRID : PAGE_SIZE_LIST;

  const paginated = useMemo(
    () => articles.slice((page - 1) * pageSize, page * pageSize),
    [articles, page, pageSize],
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 8 }}>
        <Tooltip title="Карточки">
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => { setViewMode('grid'); setPage(1); }}
          />
        </Tooltip>
        <Tooltip title="Список">
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => { setViewMode('list'); setPage(1); }}
          />
        </Tooltip>
      </div>

      {articles.length === 0 ? (
        <Empty
          description={search ? `Ничего не найдено по запросу «${search}»` : 'Статей пока нет'}
        />
      ) : viewMode === 'grid' ? (
        <Row gutter={[16, 16]}>
          {paginated.map((article) => (
            <ArticleCard key={String(article.id)} article={article} />
          ))}
        </Row>
      ) : (
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8 }}>
          {paginated.map((article) => (
            <ArticleListItem key={String(article.id)} article={article} />
          ))}
        </div>
      )}

      {articles.length > pageSize && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={articles.length}
            onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}–${range[1]} из ${total}`}
          />
        </div>
      )}
    </div>
  );
};