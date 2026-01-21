import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/current-affairs/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div>Hello "/current-affairs"!</div>
}
