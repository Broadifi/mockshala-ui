import type { UploadProfilePicResponse } from "@/api/model/auth-model";
import api from "@/api/services";
import { apiUrl } from "@/api/url";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";


export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response: AxiosResponse<UploadProfilePicResponse> = await api.post(
        apiUrl.uploadProfileImage,
        formData,
      );

      return response.data;
    },
  });
};