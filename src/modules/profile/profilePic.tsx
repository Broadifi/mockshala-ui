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
import { DeleteImageDialog } from "./deleteImage";

function ProfilePic() {
  const { userDetails, setUserDetails } = useAuthStore((state) => state.auth);

  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | undefined>(
    userDetails?.profilePicture?.path,
  );

  const profilePicUrl = uploadedPath;
  const [userId, setUserId] = useState("");

  const queryClient = useQueryClient();

  const { data: fetchProfileData, isSuccess: profileSuccess } =
    useProfileData(userId);

  // 👉 Close overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      console.log(containerRef.current?.contains(e.target as Node));
      
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowOverlay(false);
      }
    }

    if (showOverlay) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOverlay]);

  // 👉 Open file explorer
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Upload photo ID to profile
  const updatePhotoIdMutation = useMutation({
    mutationFn: authApi.updateProfileImageId,
    onSuccess: (response) => {
      if (response.status) {
        const data = response.data;
        setUserId(data._id);

        toast.success("Image uploaded successfully", { duration: 5000 });

        queryClient.invalidateQueries({
          queryKey: queryKeys.profileKeys.profileDetails(
            userDetails?._id ?? "",
          ),
        });
      }
    },
  });

  const handleProfileImageUpdate = (imageId: string) => {
    updatePhotoIdMutation.mutate({ profilePicture: imageId });
  };

  // Upload image API
  const profilePhotoMutation = useMutation({
    mutationFn: authApi.uploadProfileImage,
    onSuccess: (res) => {
      if (res.status && res?.data?.path) {
        const imageId = res.data._id;

        if (imageId) {
          handleProfileImageUpdate(imageId);
        } else {
          toast.error("Image upload failed! Try again", { duration: 5000 });
        }

        setUploadedPath(res.data.path);
      }
    },
    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    },
  });

  useEffect(() => {
    if (profileSuccess && fetchProfileData) {
      const data = fetchProfileData.data;
      setUserDetails(normalizeUser(data));
    }
  }, [profileSuccess, fetchProfileData, setUserDetails]);

  const uploadState = profilePhotoMutation.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    profilePhotoMutation.mutate(file);
  };

  const handleView = () => {
    if (!profilePicUrl) return;
    setViewDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
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
          <div
            ref={containerRef}
            className="relative group w-26 h-26 md:w-34 md:h-34 lg:w-38 lg:h-38 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowOverlay((prev) => !prev);
            }}
          >
            {/* Profile Image */}
            <img
              src={IMAGE_BASE_URL + profilePicUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-sm"
              onError={(e) => {
                e.currentTarget.src = profileImage;
              }}
            />

            {/* Overlay */}
            <div
              className={`
                absolute inset-0 rounded-full
                bg-white/30 backdrop-blur-sm
                flex items-center justify-center gap-4
                transition-all duration-300 ease-in-out
                ${
                  showOverlay
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                }
              `}
            >
              {/* View */}
              <button
                title="View"
                onClick={(e) => {
                  e.stopPropagation();
                  handleView();
                }}
                className="text-blue-500 hover:scale-110 transition"
              >
                <Eye />
              </button>

              {/* Delete */}
              <button
                title="Delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
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
            onClick={handleUploadClick}
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

      <DeleteImageDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        profilePath={setUploadedPath}
      />
    </div>
  );
}

export default ProfilePic;