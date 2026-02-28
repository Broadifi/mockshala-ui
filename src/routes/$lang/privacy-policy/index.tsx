import PrivacyPolicy from '@/modules/privacyPolicy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/privacy-policy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PrivacyPolicy/>
}
