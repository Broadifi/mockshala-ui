import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/exams/$examCategory/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$lang/exams/$examCategory/"!</div>
}
