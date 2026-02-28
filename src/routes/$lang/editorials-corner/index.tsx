import EditorialCornerDashboard from '@/modules/editorialCorner'
import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/editorials-corner/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <EditorialCornerDashboard/>
}
