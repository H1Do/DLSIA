import { useAuthStore } from '../shared/store/useAuthStore';
import { UserProfile } from '../widgets/UserProfile/UserProfile';
import { Navigate } from '@tanstack/react-router';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/auth" />;

  return <UserProfile user={user} />;
};