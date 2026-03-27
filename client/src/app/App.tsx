import { RouterProvider } from '@tanstack/react-router';
import { router, queryClient } from './router';
import { useAuthStore } from '../shared/store/useAuthStore';
import { useFetchMe } from '../entities/user/hooks/useFetchMe';
import { Spin, theme } from 'antd';

export function App() {
  const { token } = theme.useToken();
  const { isLoading, isFetching } = useFetchMe();
  const { user } = useAuthStore();

  const isVerifying = (isLoading || isFetching) && !user;

  if (isVerifying) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: token.colorBgContainer,
          padding: token.paddingLG,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <RouterProvider
      router={router}
      context={{
        queryClient,
        auth: { isAuthenticated: !!user },
      }}
    />
  );
}
