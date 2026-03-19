import { Button, Form, Input, message } from 'antd';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import type { AxiosError } from 'axios';
import { useRegister } from '../../../shared/api/generated';

export const RegistrationForm = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [form] = Form.useForm();

  const {
    mutate,
    isPending,
    error: _error,
  } = useRegister({
    mutation: {
      onSuccess: (response) => {
        setToken(response.data.accessToken);
      },
      onError: (error: AxiosError) => {
        message.error(
          // @ts-expect-error ignore for now
          `Произошла ошибка при попытке регистрации: ${error?.response?.data.message}`,
        );
      },
    },
  });

  const onFinish = (values: {
    email: string;
    name: string;
    password: string;
  }) => {
    mutate({ data: values });
  };

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      disabled={isPending}
      style={{ maxWidth: 400, margin: '0 auto' }}
      form={form}
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
        label="Имя"
        name="name"
        rules={[
          {
            required: true,
            message: 'Введите имя',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Введите пароль',
          },
          {
            min: 8,
            max: 32,
            message:
              'Пароль должен быть не менее 8 символов и не более 32 символов',
          },
          {
            message: 'Пароль слишком простой',
            validator: (_, password) => {
              const regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
              if (regex.test(password)) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
          },
          {
            message:
              'Можно использовать только латинские буквы, цифры и спецсимволы',
            validator: (_, password) => {
              const regex = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
              if (regex.test(password)) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* TODO: add password confirmation */}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
