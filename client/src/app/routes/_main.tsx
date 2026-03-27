import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { MainLayout } from '../layouts/base-layout';

export const Route = createFileRoute('/_main')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
