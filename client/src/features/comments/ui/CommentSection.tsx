import { Avatar, Button, Divider, Input, List, Popconfirm, Spin, Typography } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useComments } from '../../../entities/comment';
import { useAuthStore } from '../../../shared/store/useAuthStore';

const { Text, Paragraph } = Typography;

interface Props {
  articleId: number;
}

export const CommentSection = ({ articleId }: Props) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { comments, isLoading, createComment, isCreating, deleteComment, isDeleting } =
    useComments(articleId);
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!body.trim()) return;
    createComment(
      { data: { body: body.trim(), articleId } },
      { onSuccess: () => setBody('') },
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div style={{ marginTop: 32 }}>
      <Divider />
      <Text strong style={{ fontSize: 16 }}>
        Комментарии ({comments.length})
      </Text>

      {/* Форма добавления */}
      {user ? (
        <div style={{ margin: '16px 0', display: 'flex', gap: 8 }}>
          <Input.TextArea
            rows={2}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Напишите комментарий..."
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            type="primary"
            loading={isCreating}
            onClick={handleSubmit}
            disabled={!body.trim()}
          >
            Отправить
          </Button>
        </div>
      ) : (
        <Paragraph type="secondary" style={{ marginTop: 16 }}>
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate({ to: '/auth' })}
          >
            Войдите
          </span>
          , чтобы оставить комментарий
        </Paragraph>
      )}

      {/* Список комментариев */}
      <List
        dataSource={comments}
        locale={{ emptyText: 'Комментариев пока нет' }}
        renderItem={(comment) => {
          const isAuthor = user?.id === comment.authorId;
          const authorName = String(
            (comment as any).author?.name ?? (comment as any).author?.email ?? '—',
          );

          return (
            <List.Item
              actions={
                isAuthor
                  ? [
                      <Popconfirm
                        title="Удалить комментарий?"
                        okText="Удалить"
                        cancelText="Отмена"
                        okType="danger"
                        onConfirm={() => deleteComment({ id: Number(comment.id) })}
                      >
                        <Button
                          icon={<DeleteOutlined />}
                          size="small"
                          danger
                          loading={isDeleting}
                        />
                      </Popconfirm>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <span
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() =>
                      navigate({
                        to: '/profile/$id',
                        params: { id: String((comment as any).author?.id) },
                      })
                    }
                  >
                    {authorName}
                  </span>
                }
                description={new Date(String(comment.createdAt)).toLocaleDateString('ru-RU')}
              />
              <Paragraph style={{ margin: 0 }}>{String(comment.body)}</Paragraph>
            </List.Item>
          );
        }}
      />
    </div>
  );
};