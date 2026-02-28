import ProfileModule from "@/modules/profile";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/profile/")({
  //check token before goto this URL
  beforeLoad: ({ params }) => {
    const { accessToken } = useAuthStore.getState().auth;

    if (!accessToken) {
      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
        search: { login: "true" },
        replace: true,
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileModule />;
}
