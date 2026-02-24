import ComingSoon from '@/modules/comingSoon'
import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/our-plans/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <div><ComingSoon/></div>
}
