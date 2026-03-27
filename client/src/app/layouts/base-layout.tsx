import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { MainHeader } from '../../widgets/MainHeader/MainHeader';
import { MainFooter } from '../../widgets/MainFooter/MainFooter';
import type { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
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
          {children}
        </div>
      </Content>
      <MainFooter />
    </Layout>
  );
};
