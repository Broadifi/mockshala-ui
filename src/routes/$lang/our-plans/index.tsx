import { createFileRoute,  } from '@tanstack/react-router'
import OurPlansModule from '@/modules/our-plans'
export const Route = createFileRoute('/$lang/our-plans/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <OurPlansModule/>
}
