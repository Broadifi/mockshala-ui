import { useAuthStore } from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface NavigationProps {
  onClose: () => void;
}

function LogoutMobile({onClose}:NavigationProps) {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore((state) => state.auth);

 

  const handleLogOut = () => {
    logout();

    onClose();

    queryClient.clear();

    toast.success("Logged out successfully !!", {
      duration: 10000,
    });
  };

  return (
    <div
     key={"Logout"} onClick={() => handleLogOut()}>
      <Button
        variant={"default"}
        size={"sm"}
        className=" cursor-pointer p-4 my-3 mx-3
                  shadow-lg rounded-lg  bg-linear-to-r from-blue-600  to-sky-500 hover:from-sky-600 hover:to-blue-600
                   hover:scale-[1.03] hover:shadow-xl"
      >
        Logout
      </Button>
    </div>
  );
}

export default LogoutMobile;
