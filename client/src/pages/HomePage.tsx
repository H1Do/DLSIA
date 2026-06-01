import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../shared/store/useAuthStore';
import { useArticles } from '../entities/article';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { articles, isLoading } = useArticles();

  const latestArticles = articles
    .filter((a) => Boolean(a.published))
    .slice(0, 3);

  return (
    <div>
      {/* Приветствие */}
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          marginBottom: 40,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 12,
          color: 'white',
        }}
      >
        <Title level={1} style={{ color: 'white', margin: 0 }}>
          Добро пожаловать{user?.name ? `, ${user.name}` : ''}!
        </Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 12 }}>
          DLSIA — платформа для публикации и чтения статей.
          Делитесь знаниями и открывайте новое.
        </Paragraph>
        <Button
          size="large"
          type="primary"
          ghost
          icon={<ArrowRightOutlined />}
          onClick={() => navigate({ to: '/articles' })}
          style={{ marginTop: 8 }}
        >
          Все статьи
        </Button>
      </div>

      {/* Последние статьи */}
      <Title level={3}>Последние статьи</Title>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : latestArticles.length === 0 ? (
        <Paragraph type="secondary">Статей пока нет</Paragraph>
      ) : (
        <Row gutter={[16, 16]}>
          {latestArticles.map((article) => (
            <Col xs={24} sm={12} lg={8} key={String(article.id)}>
              <Card
                title={String(article.title)}
                style={{ cursor: 'pointer', height: '100%' }}
                onClick={() =>
                  navigate({ to: '/article/$id', params: { id: String(article.id) } })
                }
              >
                {article.description && (
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {String(article.description)}
                  </Paragraph>
                )}
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Автор: {String(article.author?.name ?? article.author?.email ?? '—')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};