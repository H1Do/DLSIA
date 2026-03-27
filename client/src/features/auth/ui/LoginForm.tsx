import type { AxiosError } from 'axios';
import type { LoginDto } from '../../../shared/api/model';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { Button, Form, Input, message } from 'antd';
import { useLogin } from '../../../shared/api/generated';
import { redirect } from '@tanstack/react-router';

export const LoginForm = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const { mutate, isPending } = useLogin({
    mutation: {
      onSuccess: (response) => {
        setToken(response.data.accessToken);
        redirect({ to: '/' });
      },
      onError: (error: AxiosError) => {
        // FIXME make a better error handling (in server side firstly)
        message.error(
          // @ts-expect-error ignore for now
          `Произошла ошибка при попытке входа: ${error?.response?.data.message}`,
        );
      },
    },
  });

  const onFinish = (values: LoginDto) => {
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
        rules={[
          { required: true, message: 'Введите пароль' },
          {
            min: 8,
            max: 32,
            message:
              'Пароль должен быть не менее 8 символов и не более 32 символов',
          },
        ]}
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
