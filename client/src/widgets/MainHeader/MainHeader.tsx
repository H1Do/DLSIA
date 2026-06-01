import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Flex, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useAuthStore } from '../../shared/store/useAuthStore';
import { router } from '../../app/router';
import { Link } from '@tanstack/react-router';
import useApp from 'antd/es/app/useApp';

export const MainHeader = () => {
  const { modal } = useApp();
  const { token } = theme.useToken();
  const { user, logout } = useAuthStore();

  const onLogout = () => {
    modal.confirm({
      title: 'Вы точно хотите выйти?',
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'primary',
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
      <Flex gap={24} align="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontWeight: 'bold', color: token.colorPrimary }}>
            DLSIA
          </div>
        </Link>
        <Link
          to="/articles"
          style={{ color: token.colorText, textDecoration: 'none' }}
            >
          Статьи
        </Link>
      </Flex>
      <Flex gap={8} align="center">
        <div>{user?.name}</div>
        {<Link to="/profile" title="Профиль">
          <Avatar>
            <UserOutlined />
          </Avatar>
        </Link>}
        <Button
          type="text"
          title="Выйти"
          popover="hint"
          onClick={onLogout}
          shape="circle"
        >
          <LogoutOutlined />
        </Button>
      </Flex>
    </Header>
  );
};
