import { useParams } from '@tanstack/react-router';
import { Result, Spin } from 'antd';
import { useGetAllUsers } from '../shared/api/generated';
import { useAuthStore } from '../shared/store/useAuthStore';
import { UserProfile } from '../widgets/UserProfile/UserProfile';

export const PublicProfilePage = () => {
  const { id } = useParams({ from: '/_public/profile/$id' });
  const { data, isLoading } = useGetAllUsers();
  const { user: currentUser } = useAuthStore();
  const user = data?.data?.find((u) => u.id === Number(id));

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>;
  }

  if (!user) {
    return <Result status="404" title="Пользователь не найден" />;
  }

  const isOwner = currentUser?.id === user.id;

  return <UserProfile user={user} isOwner={isOwner} />;
};