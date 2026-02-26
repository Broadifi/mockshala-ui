import { User } from "lucide-react";

function ProfileIcon() {
  return (
    <div className="
      flex items-center justify-center
        w-7 h-7 lg:w-8 lg:h-8 rounded-full
      bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400
      shadow-md
      hover:shadow-lg
      transition-all duration-300
      cursor-pointer
    ">
      <User className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
    </div>
  );
}

export default ProfileIcon;
