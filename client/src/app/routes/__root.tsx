import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

interface RouterContext {
  queryClient: QueryClient;
  auth: { isAuthenticated: boolean };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        {!import.meta.env.PROD && (
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        )}
      </>
    );
  },
});
