import HomeModule from "@/modules/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-background">
      <HomeModule />
    </main>
  );
}
