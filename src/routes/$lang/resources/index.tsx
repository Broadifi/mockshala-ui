import { createFileRoute,  } from '@tanstack/react-router'
import ResourcesModule from '@/modules/resources'
export const Route = createFileRoute('/$lang/resources/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <ResourcesModule/>
}
