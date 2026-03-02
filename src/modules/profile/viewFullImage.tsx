import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog"
import { useAuthStore } from "@/stores/authStore";

interface ViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function ViewFullImage({
  open,
  onOpenChange, 
}: ViewDialogProps) {

const { userDetails } = useAuthStore((state) => state.auth);
const profilePic = userDetails?.profilePicture
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>   
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="pb-4">{profilePic?.originalname}</DialogTitle>
          <DialogDescription>
           <img
              src={IMAGE_BASE_URL + profilePic?.path}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-sm"
              onError={(e) => {
                e.currentTarget.src = profileImage;
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
