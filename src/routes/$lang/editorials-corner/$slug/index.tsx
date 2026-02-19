import ComingSoon from "@/modules/comingSoon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/editorials-corner/$slug/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComingSoon />;
}
