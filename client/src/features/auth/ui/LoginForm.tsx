import { useAuthControllerLogin } from '../../../shared/api/generated';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { Button, Form, Input } from 'antd';

export const LoginForm = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate, isPending, error } = useAuthControllerLogin({
    mutation: {
      onSuccess: (response) => {
        console.log(response);
      },
    },
  });

  const onFinish = (values: { email: string; password: string }) => {
    mutate({ data: values });
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      disabled={isPending}
      style={{ maxWidth: 400, margin: '0 auto' }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Введите корректный email',
          },
        ]}
      >
        <Input placeholder="example@mail.com" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password placeholder="******" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
