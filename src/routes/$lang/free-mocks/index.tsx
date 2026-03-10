import { createFileRoute,  } from '@tanstack/react-router'
import FreeMocksModule from '@/modules/free-mocks'
export const Route = createFileRoute('/$lang/free-mocks/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return <FreeMocksModule/>
}
