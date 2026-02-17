
import CurrentAffairsDetails from "@/modules/current-affairs/currentAffairsDetails";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/$lang/current-affairs/$slug/")({
  component: CurrentAffairsDetails,
});

