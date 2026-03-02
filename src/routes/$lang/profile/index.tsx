import ProfileModule from "@/modules/profile";
import { useAuthStore } from "@/stores/authStore";
import { useLoginStore } from "@/stores/loginStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/profile/")({
  //check token before goto this URL
  beforeLoad: ({ params }) => {
    const { accessToken } = useAuthStore.getState().auth;

    //update login modal state
    const { loginState, setLoginState } = useLoginStore.getState();

    if (!accessToken) {
      if (!loginState) {
        setLoginState(true);
      }

      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
        replace: true,
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return <ProfileModule />;
}
