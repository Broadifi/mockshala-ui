import CancellationRefund from '@/modules/cancellationRefund'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/cancellationRefund/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CancellationRefund />
}
