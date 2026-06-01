import { useState, useMemo } from 'react';
import type { ArticleEntity } from '../../../../shared/api/model';

export const useArticlesFilter = (articles: ArticleEntity[]) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => {
      const title = String(a.title ?? '').toLowerCase();
      const desc = String(a.description ?? '').toLowerCase();
      const author = String(a.author?.name ?? a.author?.email ?? '').toLowerCase();
      return title.includes(q) || desc.includes(q) || author.includes(q);
    });
  }, [articles, search]);

  return { search, setSearch, filtered };
};