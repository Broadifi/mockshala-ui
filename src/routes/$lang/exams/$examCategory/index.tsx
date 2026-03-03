import { createFileRoute } from '@tanstack/react-router'
import ExamsModule from '@/modules/exams'
export const Route = createFileRoute('/$lang/exams/$examCategory/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExamsModule/>
}
