import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";
import { useAuthStore } from "@/stores/authStore";
import { User } from "lucide-react";

function ProfileIconExam() {
  const { userDetails } = useAuthStore((state) => state.auth);

  const profileUrl = userDetails?.profilePicture?.path;

  return (
    <div>
      {profileUrl ? (
        <div className="w-10 h-10 md:w-11 md:h-11">
          <img
            src={IMAGE_BASE_URL + profileUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover shadow-sm"
            onError={(e) => {
              e.currentTarget.src = profileImage;
            }}
          />
        </div>
      ) : (
        <div
          className="
        flex items-center justify-center
        w-7 h-7 lg:w-8 lg:h-8 rounded-full
        bg-linear-to-br from-blue-600 via-blue-500 to-sky-400
        shadow-md
        hover:shadow-lg
        transition-all duration-300
        cursor-pointer"
        >
          <User className=" lg:w-6 lg:h-6 text-white" />
        </div>
      )}
    </div>
  );
}

export default ProfileIconExam;
