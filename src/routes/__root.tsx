import Header from "@/components/navigation/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      {/* Main content wrapper */}
      <main className="pt-15  lg:pt-16">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
