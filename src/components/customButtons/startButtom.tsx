import { useAuthStore } from "@/stores/authStore";
import { useLoginStore } from "@/stores/loginStore";
import { Play } from "lucide-react";

interface ButtonProps {
  title: string;
  url: string;
}

function StartButton({ title, url }: ButtonProps) {
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
        "examInstructionWindow",
        `width=${width},height=${height},toolbar=no,menubar=no,noopener,noreferrer`,
      );
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleStart}
        className="flex w-25 justify-center
        items-center gap-2 rounded-lg bg-linear-to-r from-button-sky
        to-button-blue 
        hover:bg-blue-700 hover:shadow-md
        text-white 
        transition-colors duration-200 px-4 py-2 hover:cursor-pointer"
      >
        <Play size={15} />
        {title}
      </button>
    </div>
  );
}

export default StartButton;
