import { Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { LoginForm } from '../features/auth/ui/LoginForm';
import { RegistrationForm } from '../features/auth/ui/RegistrationForm';

export const AuthPage = () => {
  return (
    <div>
      <div style={{ padding: '16px 24px' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeftOutlined />
          Вернуться назад
        </Link>
      </div>
      {/* TODO rewrite to routes instead of tabs */}
      <Tabs
        centered
        items={[
          { label: 'Вход', key: 'login', children: <LoginForm /> },
          { label: 'Регистрация', key: 'reg', children: <RegistrationForm /> },
        ]}
      />
    </div>
  );
};
