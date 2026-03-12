import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/mock-test/$testSeries/$test/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Result</div>
}
