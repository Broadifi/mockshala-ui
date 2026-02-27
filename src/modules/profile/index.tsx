import { useAuthStore } from "@/stores/authStore";

function ProfileModule() {

    const { userDetails } = useAuthStore(
      (state) => state.auth,
    );
  
    console.log(userDetails);
    

  return <div>ProfileModule</div>;
}

export default ProfileModule;
