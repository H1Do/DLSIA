import { Button, Checkbox, Form, Input } from 'antd';

interface CreateArticleDto {
  title: string;
  description?: string;
  body: string;
  published?: boolean;
}

interface Props {
  onSubmit: (values: CreateArticleDto) => void;
  isLoading: boolean;
  initialValues?: Partial<CreateArticleDto>;
}

export const ArticleForm = ({ onSubmit, isLoading, initialValues }: Props) => {
  const [form] = Form.useForm<CreateArticleDto>();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      disabled={isLoading}
      initialValues={initialValues}
    >
      <Form.Item
        label="Заголовок"
        name="title"
        rules={[{ required: true, message: 'Введите заголовок' }]}
      >
        <Input placeholder="Заголовок статьи" />
      </Form.Item>

      <Form.Item label="Краткое описание" name="description">
        <Input.TextArea rows={2} placeholder="Необязательно" />
      </Form.Item>

      <Form.Item
        label="Содержание"
        name="body"
        rules={[{ required: true, message: 'Введите содержание' }]}
      >
        <Input.TextArea rows={6} placeholder="Текст статьи..." />
      </Form.Item>

      <Form.Item name="published" valuePropName="checked">
        <Checkbox>Опубликовать сразу</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};