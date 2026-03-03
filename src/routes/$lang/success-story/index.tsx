import { createFileRoute,  } from '@tanstack/react-router'
import SuccessStoryModule from '@/modules/success-story'
export const Route = createFileRoute('/$lang/success-story/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <SuccessStoryModule/>
}
