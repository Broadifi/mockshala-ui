import HomeModule from "@/modules/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: RouteComponent,
});

function RouteComponent() {
   
   
  return (
    <main>
      <HomeModule />    
    </main>
  );
}
