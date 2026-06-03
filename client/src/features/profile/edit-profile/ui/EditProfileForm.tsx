import { Button, Form, Input, Divider } from 'antd';
import { useUpdateMe } from '../../../../shared/api/generated';
import { useAuthStore } from '../../../../shared/store/useAuthStore';
import type { UserEntity } from '../../../../shared/api/model';

interface Props {
  user: UserEntity;
  onSuccess: () => void;
}

export const EditProfileForm = ({ user, onSuccess }: Props) => {
  const { setUser } = useAuthStore();
  const [form] = Form.useForm();

  const { mutate: updateMe, isPending } = useUpdateMe({
    mutation: {
      onSuccess: (res) => {
        setUser(res.data as UserEntity);
        onSuccess();
      },
    },
  });

  const handleSubmit = (values: {
    name: string;
    bio: string;
    oldPassword?: string;
    newPassword?: string;
  }) => {
    const dto: Record<string, string> = {};
    if (values.name !== undefined) dto.name = values.name;
    if (values.bio !== undefined) dto.bio = values.bio;
    if (values.oldPassword) dto.oldPassword = values.oldPassword;
    if (values.newPassword) dto.newPassword = values.newPassword;
    updateMe({ data: dto });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ name: user.name ?? '', bio: user.bio ?? '' }}
      onFinish={handleSubmit}
    >
      <Form.Item label="Имя" name="name">
        <Input placeholder="Ваше имя" />
      </Form.Item>

      <Form.Item label="О себе" name="bio">
        <Input.TextArea rows={3} placeholder="Расскажите о себе..." />
      </Form.Item>

      <Divider>Смена пароля</Divider>

      <Form.Item label="Текущий пароль" name="oldPassword">
        <Input.Password placeholder="Введите текущий пароль" />
      </Form.Item>

      <Form.Item
        label="Новый пароль"
        name="newPassword"
        rules={[{ min: 6, message: 'Минимум 6 символов' }]}
      >
        <Input.Password placeholder="Введите новый пароль" />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={isPending} block>
        Сохранить
      </Button>
    </Form>
  );
};