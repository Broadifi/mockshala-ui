import CurrentAffairsPage from '@/modules/current-affairs/currentAffairsPage'
import { createFileRoute,  } from '@tanstack/react-router'
import {z} from 'zod'

const querySchema = z.object({
  date: z.string().optional(),
  tags: z.array(z.string()).optional()
})

export const Route = createFileRoute('/$lang/current-affairs/')({
  component: RouteComponent,
  validateSearch: querySchema
})

function RouteComponent() {
  
  return <CurrentAffairsPage />
}
