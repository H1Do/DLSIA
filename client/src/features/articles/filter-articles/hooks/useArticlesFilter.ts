import { useState } from 'react';

export const useArticlesFilter = () => {
  const [search, setSearch] = useState('');
  const [committedSearch, setCommittedSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setCommittedSearch(search);
    setPage(1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    search,
    setSearch,
    committedSearch,
    page,
    handleSearch,
    handlePageChange,
  };
};