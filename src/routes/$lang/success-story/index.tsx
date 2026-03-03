import SuccessStoryModule from '@/modules/success-story'
import { createFileRoute,  } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/success-story/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <SuccessStoryModule />
}
