import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Toaster
        position="top-center"
        // richColors
        // closeButton
        duration={4000}
        toastOptions={{
          className: "rounded-xl shadow-lg px-5 py-4 text-sm",
          style: {
            width: "fit-content",
            maxWidth: "420px",
          },
        }}
      />
      <TanStackRouterDevtools />
    </>
  ),
});
