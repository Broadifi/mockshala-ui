<<<<<<< Updated upstream
import ComingSoon from "@/modules/comingSoon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/exams/")({
=======
import { createFileRoute } from '@tanstack/react-router'
import ExamsModule from '@/modules/exams'
export const Route = createFileRoute('/$lang/exams/')({
>>>>>>> Stashed changes
  component: RouteComponent,
});

function RouteComponent() {
<<<<<<< Updated upstream
  return (
    <div>
      <p className="text-center">All Exams will appear here</p>

      <ComingSoon />
    </div>
  );
=======
  return <ExamsModule/>
>>>>>>> Stashed changes
}
