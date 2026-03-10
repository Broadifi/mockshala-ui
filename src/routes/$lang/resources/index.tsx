<<<<<<< HEAD
import { createFileRoute,  } from '@tanstack/react-router'
import ResourcesModule from '@/modules/resources'
export const Route = createFileRoute('/$lang/resources/')({
=======
import ResourcesModule from "@/modules/resources";
import { useAuthStore } from "@/stores/authStore";
import { useLoginStore } from "@/stores/loginStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/resources/")({
  //check token before goto this URL
  beforeLoad: ({ params }) => {
    const { accessToken } = useAuthStore.getState().auth;

    //update login modal state
    const {loginState, setLoginState } = useLoginStore.getState()

    if (!accessToken) {
      if(!loginState){

        setLoginState(true)
      }

      throw redirect({
        to: "/$lang",
        params: { lang: params.lang },
        replace: true,
      });

      
    }
  },

>>>>>>> efa357faf9b3f1a0e6e037bf6d948b922aa24982
  component: RouteComponent,
});

function RouteComponent() {
<<<<<<< HEAD
  
  return <ResourcesModule/>
=======
  return <ResourcesModule />;
>>>>>>> efa357faf9b3f1a0e6e037bf6d948b922aa24982
}
