import { Spin, Typography } from 'antd';
import { useAuthStore } from '../shared/store/useAuthStore';
import { useArticles } from '../entities/article';
import { CreateArticleButton } from '../features/articles/create-article/ui/CreateArticleButton';
import { ArticlesFilter } from '../features/articles/filter-articles/ui/ArticlesFilter';
import { useArticlesFilter } from '../features/articles/filter-articles/hooks/useArticlesFilter';
import { ArticlesList } from '../widgets/ArticlesList/ArticlesList';

const { Title } = Typography;

export const ArticlesPage = () => {
  const { user } = useAuthStore();
  const { articles, isLoading } = useArticles();
  const { search, setSearch, filtered } = useArticlesFilter(articles);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Статьи</Title>
        {user && <CreateArticleButton />}
      </div>
      <ArticlesFilter value={search} onChange={setSearch} />
      <ArticlesList articles={filtered} search={search} />
    </div>
  );
};