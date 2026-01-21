import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/our-plans/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div>Hello "/our-plans"!</div>
}
