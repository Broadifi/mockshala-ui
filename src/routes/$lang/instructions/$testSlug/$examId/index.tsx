import TestInstructionModule from "@/modules/test-instruction";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/instructions/$testSlug/$examId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TestInstructionModule/>;
}
