import { createFileRoute } from '@tanstack/react-router';
import { AuthPage } from '../../pages/AuthPage';

export const Route = createFileRoute('/_unauthorized/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage />;
}
