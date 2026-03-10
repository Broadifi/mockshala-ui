import MockTest from '@/modules/mock-test'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/mock-test/$testSeries/$test/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MockTest />
}
