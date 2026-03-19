import { useEffect } from 'react';
import { useGetMe } from '../../../shared/api/generated';
import { useAuthStore } from '../../../shared/store/useAuthStore';

export const useFetchMe = () => {
  const { token, setUser, user } = useAuthStore();

  const query = useGetMe({
    query: {
      enabled: !!token && !user,
      retry: false,
    },
  });

  useEffect(() => {
    if (query.data?.data) {
      setUser(query.data.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      useAuthStore.getState().logout();
    }
  }, [query.isError]);

  return query;
};
