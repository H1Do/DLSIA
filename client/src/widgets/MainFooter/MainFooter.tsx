import { theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';

export const MainFooter = () => {
  const { token } = theme.useToken();

  return (
    <Footer
      style={{
        textAlign: 'center',
        color: token.colorTextDescription,
        background: token.colorBgLayout,
      }}
    >
      DLSIA© 2026 Created by H1Do & F1LoS0F
    </Footer>
  );
};
