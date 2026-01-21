import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/exams/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div>Hello "/exams"!</div>
}
