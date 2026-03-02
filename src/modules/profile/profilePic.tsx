import { useEffect, useRef, useState } from "react";
import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";
import { Eye, ImageUp, Trash } from "lucide-react";
import { useProfileData } from "./profileData";
import { useAuthStore } from "@/stores/authStore";
import { normalizeUser } from "@/api/model/normalizeUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/services/auth-services";
import type { AxiosError } from "axios";
import type { ErrorObject } from "@/api/model/error-model";
import { toast } from "sonner";
import { queryKeys } from "@/api";
import { ViewFullImage } from "./viewFullImage";

function ProfilePic() {
  //Get profile pic data from the store

  const { userDetails, setUserDetails } = useAuthStore((state) => state.auth);

  //control view image dialog
const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | undefined>(
    userDetails?.profilePicture?.path,
  );

  const profilePicUrl = uploadedPath;

  const [userId, setUserId] = useState("");

  const queryClient = useQueryClient();

  const { data: fetchProfileData, isSuccess: profileSuccess } =
    useProfileData(userId);

  // 👉 Open file explorer
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  //Upload photo ID to user profile and sync

  const updatePhotoIdMUtation = useMutation({
    mutationFn: authApi.updateProfileImageId,
    onSuccess: (response) => {
      if (response.status) {
        const data = response.data;
        //set the image id to update on profile
        setUserId(data._id);

        toast.success("Image upload successfully", { duration: 5000 });

        // ⭐ THIS IS THE KEY FIX
        queryClient.invalidateQueries({
          queryKey: queryKeys.profileKeys.profileDetails(
            userDetails?._id ?? "",
          ),
        });
      }
    },
  });

  const handleProfileImageUpdate = (imageId: string) => {
    updatePhotoIdMUtation.mutate({ profilePicture: imageId });
  };

  //Upload photo to API
  const profilePhotoMutation = useMutation({
    mutationFn: authApi.uploadProfileImage,

    onSuccess: (res) => {
      if (res.status) {
        if (res?.data?.path) {
          const imageId = res.data._id;
          if (imageId) {
            handleProfileImageUpdate(imageId);
          } else {
            toast.error("Image upload failed!! Try again", { duration: 5000 });
          }

          setUploadedPath(res.data.path); // update UI instantly
        }
      }
    },
    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    },
  });

  useEffect(() => {
    if (profileSuccess && fetchProfileData) {
      const data = fetchProfileData.data;

      // Update Zustand store with fetched normalized data
      setUserDetails(normalizeUser(data));
    }
  }, [profileSuccess, fetchProfileData, setUserDetails]);

  const uploadState = profilePhotoMutation.isPending;

  // 👉 When user selects image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    profilePhotoMutation.mutate(file);
  };

  // VIEW IMAGE
  const handleView = () => {
    if (!profilePicUrl) return;

    setViewDialogOpen(true);
  };

  // DELETE IMAGE
  const handleDelete = () => {
    console.log("Delete clicked");

   
    // Example UI reset
    // setUploadedPath(undefined);

    // Optional:
    // call API here to remove imageId from profile
  };

  return (
    <div>
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex justify-center mb-3 md:mb-4">
        {profilePicUrl ? (
          <div className="relative group w-25 h-25 md:w-34 md:h-34">
            {/* Profile Image */}
            <img
              src={IMAGE_BASE_URL + profilePicUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-sm"
              onError={(e) => {
                e.currentTarget.src = profileImage;
              }}
            />

            {/* Hover Overlay */}
            <div
              className="
                absolute inset-0 rounded-full
                bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-100
                flex items-center justify-center gap-4
                transition-all duration-300
                "
            >
              {/* View Button */}
              <button
                title="View"
                onClick={() => handleView()}
                className="text-blue-500 hover:scale-110 transition"
              >
                <Eye />
              </button>

              {/* Delete Button */}
              <button
                title="Delete"
                onClick={() => handleDelete()}
                className="text-red-600 hover:scale-110 transition"
              >
                <Trash />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center items-center 
            w-25 h-25 md:w-34 md:h-34 rounded-full border-2 border-solid 
            hover:border-dotted border-blue-500 cursor-pointer 
            bg-gray-100 hover:bg-blue-100 shadow-sm hover:shadow-md 
            transition-all duration-300"
            onClick={handleClick}
          >
            <button
              className="cursor-pointer flex flex-col items-center 
                justify-center gap-1 text-title-darkblue"
              disabled={uploadState}
            >
              <ImageUp />
              {uploadState ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}
      </div>


      <ViewFullImage
        open={isViewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
    </div>
  );
}

export default ProfilePic;
