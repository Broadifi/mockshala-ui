import AboutPage from '@/modules/about'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutPage />
}
