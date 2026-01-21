import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/resources/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div>Hello "/resources"!</div>
}
