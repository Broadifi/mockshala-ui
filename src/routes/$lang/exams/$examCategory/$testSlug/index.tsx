import DescriptionModule from '@/modules/testDescription'
import { createFileRoute,} from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/exams/$examCategory/$testSlug/')({
  component: RouteComponent,
})

function RouteComponent() {
  

  return (
   <DescriptionModule />
  )
}
