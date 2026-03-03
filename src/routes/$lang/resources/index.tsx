import ResourcesModule from '@/modules/resources'
import { createFileRoute } from '@tanstack/react-router'

type ResourcesSearch = {
  category?: string
}

export const Route = createFileRoute('/$lang/resources/')({
  
  validateSearch: (search: Record<string, unknown>): ResourcesSearch => {
    return {
      category: search.category as string | undefined,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <ResourcesModule />
}
