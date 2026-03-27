import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAuthStore } from '../../shared/store/useAuthStore';
import useModal from 'antd/es/modal/useModal';
import { router } from '../../app/router';

export const MainHeader = () => {
  const { token } = theme.useToken();
  const { logout } = useAuthStore();
  const [modal, contextHolder] = useModal();

  const onLogout = () => {
    modal.confirm({
      title: 'Вы точно хотите выйти?',
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'danger',
      onOk: async () => {
        logout();
        await router.invalidate();
        message.success('Вы успешно вышли');
      },
    });
  };

  return (
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
      <Flex gap={8}>
        <Avatar />
        <Button type="text" title="Выйти" popover="hint" onClick={onLogout}>
          <LogoutOutlined />
        </Button>
      </Flex>
      {contextHolder}
    </Header>
  );
};
