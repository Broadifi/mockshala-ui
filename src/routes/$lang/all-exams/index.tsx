import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/all-exams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$lang/all-exams/"!</div>
}
