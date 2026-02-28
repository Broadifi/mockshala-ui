import TermsConditions from '@/modules/termsAndCondition'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/terms-and-conditions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TermsConditions />
}
