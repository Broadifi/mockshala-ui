import ComingSoon from "@/modules/comingSoon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/exams/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p className="text-center">All Exams will appear here</p>

      <ComingSoon />
    </div>
  );
}
