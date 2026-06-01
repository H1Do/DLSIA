import { Avatar, Card, Col, Empty, Row, Spin, Tabs, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from '@tanstack/react-router';
import type { UserEntity } from '../../shared/api/model';
import { useUserArticles } from '../../entities/article';
import type { ArticleEntity } from '../../shared/api/model';

const { Title, Text, Paragraph } = Typography;

interface Props {
  user: UserEntity;
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

export const UserProfile = ({ user }: Props) => {
  const { published, drafts, isLoading } = useUserArticles(user.id);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
  }

  return (
    <div>
      {/* Шапка профиля */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Avatar size={80} icon={<UserOutlined />} />
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {user.name ?? 'Без имени'}
            </Title>
            <Text type="secondary">{user.email}</Text>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <Tag color="blue">{published.length} опубликовано</Tag>
              <Tag color="orange">{drafts.length} черновиков</Tag>
            </div>
          </div>
        </div>
      </Card>

      {/* Статьи */}
      <Tabs
        items={[
          {
            key: 'published',
            label: `Опубликованные (${published.length})`,
            children: <ArticleGrid articles={published} />,
          },
          {
            key: 'drafts',
            label: `Черновики (${drafts.length})`,
            children: <ArticleGrid articles={drafts} />,
          },
        ]}
      />
    </div>
  );
};