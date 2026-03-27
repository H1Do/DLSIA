import { createFileRoute, redirect } from '@tanstack/react-router';
import { AuthPage } from '../../pages/AuthPage';

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
  component: AuthPage,
});
