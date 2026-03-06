import { useAuthStore } from "@/stores/authStore";
import { useLoginStore } from "@/stores/loginStore";
import { Play } from "lucide-react";

interface ButtonProps {
  title: string;
  url: string;
}

function StartTestMobile({ title, url }: ButtonProps) {
  const { accessToken } = useAuthStore((state) => state.auth);

  const { loginState, setLoginState } = useLoginStore();

  const handleStart = () => {
    const width = screen.width;
    const height = screen.height;

    if (!accessToken) {
      console.log("token is not avail");

      if (!loginState) {
        console.log("login state is", loginState);

        setLoginState(true);
      }
    } else {
      window.open(
        url,
        "examWindow",
        `width=${width},height=${height},toolbar=no,menubar=no,noopener,noreferrer`,
      );
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleStart}
        className="flex justify-center items-center gap-2
        w-full bg-linear-to-r from-button-sky to-button-blue 
                 text-white font-semibold rounded-lg h-9"
      >
        <Play size={16}/>
        {title}
      </button>
    </div>
  );
}

export default StartTestMobile;
