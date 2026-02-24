import ComingSoon from "@/modules/comingSoon";
import { createFileRoute } from "@tanstack/react-router";
import EditorialCornerDetails from "@/modules/editorialCorner/editorialCornerDetails";
export const Route = createFileRoute("/$lang/editorials-corner/$slug/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditorialCornerDetails />;
}
