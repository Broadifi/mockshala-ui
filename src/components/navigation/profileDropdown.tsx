import { Link, useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ProfileIcon from "../ProfileIcon";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

function ProfileDropdown() {
  const { lang } = useParams({ strict: false });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { logout } = useAuthStore((state) => state.auth);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogOut = () => {
    logout();
    queryClient.clear();

    toast.success("Logged out successfully !!", {
      duration: 5000,
    });

    navigate({
      to: "/$lang",
      params: { lang: lang ?? "en" },
      replace: true, // prevents back navigation to protected page
    });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="font-medium cursor-pointer text-xs 2xl:text-sm"
          >
            <ProfileIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-2 z-50" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                key="Profile"
                to="/$lang/profile"
                params={{ lang: `${lang}` }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(`/${lang}/profile`)
                    ? "bg-primary/10 text-primary"
                    : "text-title-darkblue hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Profile
              </Link>
            </DropdownMenuItem >

            <DropdownMenuItem asChild>
              <div key={"Logout"} onClick={() => handleLogOut()}>
                <Button
                  variant={"default"}
                  size={"sm"}
                  className=" cursor-pointer p-4 
                  shadow-lg rounded-lg  bg-linear-to-r from-blue-600  to-sky-500 hover:from-sky-600 hover:to-blue-600
                   hover:scale-[1.03] hover:shadow-xl"
                >
                  Logout
                </Button>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileDropdown;
