import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";
import { ImageUp } from "lucide-react";

interface ProfileInterface {
  profilePath: string | undefined;
}

function ProfilePic({ profilePath }: ProfileInterface) {
  // ─── GET PROFILE PICTURE URL ───
  const profilePicUrl = profilePath;

  const handleClick = () => {
    console.log("proileeee");
  };

  return (
    <div>
      <div className="flex justify-center mb-3 md:mb-4">
        {profilePicUrl ? (
          <div className="relative">
            <img
              src={IMAGE_BASE_URL + profilePicUrl}
              alt={profilePicUrl || "Profile Image"}
              className="w-25 h-25  md:w-34 md:h-34 rounded-full object-cover border-4 border-blue-500"
              onError={(e) => {
                e.currentTarget.src = profileImage;
              }}
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center 
                 w-25 h-25  md:w-34 md:h-34 rounded-full object-cover border-2 border-solid hover:border-dotted border-blue-500
                cursor-pointer bg-gray-100 hover:bg-blue-100 shadow-sm hover:shadow-md transition-all duration-300
                 "
          >
            <button
              className="cursor-pointer flex flex-col items-center justify-center 
                    gap-1 text-title-darkblue"
              onClick={handleClick}
            >
              <ImageUp />
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePic;
