import { Skeleton } from "@/components/ui/skeleton";
import { createRoute, createRouter } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { rootRoute } from "./routes/__root";

const HomePage = lazy(() => import("./pages/Home"));
const AdminPage = lazy(() => import("./pages/Admin"));

const PageLoader = () => (
  <div className="flex flex-col gap-4 p-8 max-w-4xl mx-auto">
    <Skeleton className="h-72 w-full rounded-2xl" />
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-8 rounded-lg" />
      <Skeleton className="h-8 rounded-lg" />
    </div>
    <Skeleton className="h-48 w-full rounded-xl" />
  </div>
);

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute, adminRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
