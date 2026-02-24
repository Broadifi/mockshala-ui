import ComingSoon from '@/modules/comingSoon'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/checkout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ComingSoon />
}
