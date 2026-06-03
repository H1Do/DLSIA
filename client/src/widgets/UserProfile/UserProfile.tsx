import { useState } from 'react';
import { Avatar, Button, Card, Col, Empty, Modal, Row, Spin, Tabs, Tag, Typography } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import type { UserEntity, ArticleEntity } from '../../shared/api/model';
import { useUserArticles } from '../../entities/article';
import { EditProfileForm } from '../../features/profile/edit-profile/ui/EditProfileForm';

const { Title, Text, Paragraph } = Typography;

interface Props {
  user: UserEntity;
  isOwner: boolean;
}

const ArticleGrid = ({ articles }: { articles: ArticleEntity[] }) => {
  const navigate = useNavigate();

  if (articles.length === 0) {
    return <Empty description="Нет статей" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {articles.map((a) => (
        <Col xs={24} sm={12} lg={8} key={String(a.id)}>
          <Card
            title={String(a.title)}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate({ to: '/article/$id', params: { id: String(a.id) } })}
            extra={
              <Tag color={a.published ? 'green' : 'orange'}>
                {a.published ? 'Опубликовано' : 'Черновик'}
              </Tag>
            }
          >
            {a.description && (
              <Paragraph ellipsis={{ rows: 2 }}>{String(a.description)}</Paragraph>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export const UserProfile = ({ user, isOwner }: Props) => {
  const { published, drafts, isLoading } = useUserArticles(user.id);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
  }

  const tabs = [
    {
      key: 'published',
      label: `Опубликованные (${published.length})`,
      children: <ArticleGrid articles={published} />,
    },
    ...(isOwner
      ? [
          {
            key: 'drafts',
            label: `Черновики (${drafts.length})`,
            children: <ArticleGrid articles={drafts} />,
          },
        ]
      : []),
  ];

  return (
    <div>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Avatar size={80} icon={<UserOutlined />} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  {user.name ?? 'Без имени'}
                </Title>
                <Text type="secondary">{user.email}</Text>
                {user.bio && (
                  <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
                    {user.bio}
                  </Paragraph>
                )}
              </div>
              {isOwner && (
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setIsEditOpen(true)}
                >
                  Редактировать профиль
                </Button>
              )}
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <Tag color="blue">{published.length} опубликовано</Tag>
              {isOwner && <Tag color="orange">{drafts.length} черновиков</Tag>}
            </div>
          </div>
        </div>
      </Card>

      <Tabs items={tabs} />

      <Modal
        title="Редактировать профиль"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <EditProfileForm user={user} onSuccess={() => setIsEditOpen(false)} />
      </Modal>
    </div>
  );
};