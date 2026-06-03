import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from '../layouts/base-layout';

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}