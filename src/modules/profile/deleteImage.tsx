import { queryKeys } from "@/api";
import { authApi } from "@/api/services/auth-services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";

interface ViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  profilePath: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function DeleteImageDialog({
  open,
  onOpenChange,
  profilePath,
}: ViewDialogProps) {
  const queryClient = useQueryClient();
  const { userDetails } = useAuthStore((state) => state.auth);

  const deleteImageMutation = useMutation({
    mutationFn: authApi.deleteProfileImage,

    onSuccess: () => {
      toast.success("Profile image deleted");

      // close dialog
      onOpenChange(false);

      // clear UI instantly
      profilePath(undefined);

      // refetch profile
      queryClient.invalidateQueries({
        queryKey: queryKeys.profileKeys.profileDetails(userDetails?._id ?? ""),
      });
    },

    onError: () => {
      toast.error("Failed to delete image");
    },
  });

  const handleDelete = () => {
    if (!userDetails?.profilePicture?._id) return;

    deleteImageMutation.mutate(userDetails.profilePicture._id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-title-darkblue">Delete Profile Picture?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove your profile picture? This action
            cannot be undone, and your profile will revert to the default image.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline"
                className="cursor-pointer"
            >Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleDelete}
            disabled={deleteImageMutation.isPending}
            className="bg-red-600 font-medium cursor-pointer hover:bg-linear-to-r  hover:from-blue-600 hover:to-sky-600"
          >
            {deleteImageMutation.isPending ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
