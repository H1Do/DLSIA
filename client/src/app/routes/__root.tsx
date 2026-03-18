import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Avatar, ConfigProvider, Layout, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';

export const Route = createRootRoute({
  component: () => {
    const { token } = theme.useToken();

    return (
      <>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#ff0000',
            },
          }}
        >
          <Layout style={{ minHeight: '100vh' }}>
            <Header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: token.colorBgContainer,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                padding: `0 ${token.paddingLG}px`,
              }}
            >
              <div style={{ fontWeight: 'bold', color: token.colorPrimary }}>
                Here will be logo
              </div>
              <Avatar />
            </Header>
            <Content
              style={{
                padding: token.paddingLG,
                background: token.colorBgLayout,
              }}
            >
              <div
                style={{
                  background: token.colorBgContainer,
                  minHeight: '280px',
                  padding: token.paddingLG,
                  borderRadius: token.borderRadiusLG,
                  boxShadow: token.boxShadowTertiary,
                }}
              >
                <Outlet />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
                color: token.colorTextDescription,
                background: token.colorBgLayout,
              }}
            >
              footer placeholder
            </Footer>
          </Layout>
        </ConfigProvider>
        <TanStackRouterDevtools />
      </>
    );
  },
});
