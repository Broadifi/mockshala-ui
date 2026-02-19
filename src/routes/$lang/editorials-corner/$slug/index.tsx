import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/editorials-corner/$slug/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$lang/editorials-corner/$slug/"!</div>
}
