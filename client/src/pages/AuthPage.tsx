import { Tabs } from 'antd';
import { LoginForm } from '../features/auth/ui/LoginForm';
import { RegistrationForm } from '../features/auth/ui/RegistrationForm';

export const AuthPage = () => {
  return (
    // TODO rewrite to routes instead of tabs
    <Tabs
      centered
      items={[
        { label: 'Вход', key: 'login', children: <LoginForm /> },
        { label: 'Регистрация', key: 'reg', children: <RegistrationForm /> },
      ]}
    />
  );
};
