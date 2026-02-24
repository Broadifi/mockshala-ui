import ComingSoon from '@/modules/comingSoon'
import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/free-mocks/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div><ComingSoon/></div>
}

