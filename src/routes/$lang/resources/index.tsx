import ResourcesModule from "@/modules/resources";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/resources/")({
  //check token before goto this URL
  beforeLoad: ({ params }) => {
    const { accessToken } = useAuthStore.getState().auth;

    if (!accessToken) {
      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
        search: { login: "true" }, // 👈 IMPORTANT - Opens login dialog on home page
        replace: true,
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <ResourcesModule />;
}
