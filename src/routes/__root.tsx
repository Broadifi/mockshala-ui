import FooterCTA from "@/components/navigation/footer";
import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function RootComponent() {
  const { pathname } = useLocation();
  const isInstructionsRoute = pathname.includes("/instructions/");

  return (
    <>
      {!isInstructionsRoute && <Header />}

      <main className={!isInstructionsRoute ? "pt-[3.25rem]" : ""}>
        <Outlet />
      </main>

      {!isInstructionsRoute && <FooterCTA />}

      <Toaster
        position="top-center"
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
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});