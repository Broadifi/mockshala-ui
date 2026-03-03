import { createFileRoute,  } from '@tanstack/react-router'
import ProfileModule from '@/modules/profile'
export const Route = createFileRoute('/$lang/profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <ProfileModule/>
}
