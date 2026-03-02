import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";

interface ProfileInterface{
    profilePicUrl:string
}

function ProfilePic({profilePicUrl}:ProfileInterface) {
  return (
    <div>
         <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative">
                  <img
                    src={IMAGE_BASE_URL + profilePicUrl}
                    alt={profilePicUrl || "Profile Image"}
                    className="w-25 h-25  md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500"
                    onError={(e) => {
                      e.currentTarget.src = profileImage;
                    }}
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default ProfilePic