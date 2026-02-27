import { useEffect } from "react";
import { authApi } from "@/api/services/auth-services";
import { useAuthStore } from "@/stores/authStore";

function ProfileModule() {
  const { userDetails } = useAuthStore((state) => state.auth);

  useEffect(() => {
    const testUpdate = async () => {
      try {
        const result = await authApi.updateProfile({
         
          name: "Arijit Khanmmmm",
          mobile: "9593737230",
          dob: "1999-11-27T18:30:00.000Z",
          line1: "garhbeta, paschim medinipur, 721127",
          line2: "kolkata",
          city: "Kolkata",
          state: "WB",
          pinCode: 721164,
          gender: "male",
        });

        console.log("API Response:", result);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    testUpdate();
  }, []);

  return <div>ProfileModule</div>;
}

export default ProfileModule;
