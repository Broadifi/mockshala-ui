import HomeModule from "@/modules/home";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/$lang/")({
  validateSearch: (search) =>
    z
      .object({
        login: z.string().optional(),
      })
      .parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <HomeModule />
    </main>
  );
}
