import type { AxiosResponse } from "axios";
import type { AuthLoginData, AuthOtpData, AuthRegistrationData, GetProfileResponse, LoginResponse, OtpResponse, RegistrationResponse, UpdateProfileResponse } from "../model/auth-model";
import api from ".";
import { apiUrl } from "../url";
import type { DeleteImageResponse, uploadProfilePicIdRes, UploadProfilePicResponse } from "../model/profilePic-model";

interface UpdateProfilePayload {
  email?: string;
  name: string;
  mobile: string;
  dob: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pinCode: number;
  gender: string;
}

interface UpdateProfilePic{
    profilePicture: string
}

export const authApi ={
    login: async(data:AuthLoginData) => {
        const response: AxiosResponse<LoginResponse> = await api.post(apiUrl.mobileLogin,data)

        return response.data
    },

    otpVerification: async(data:AuthOtpData) => {
        const response: AxiosResponse<OtpResponse> = await api.post(
            apiUrl.otpVerificationLogin,data)

        return response.data
    },

    registrationVerification: async(data:AuthRegistrationData) => {
        const response: AxiosResponse<RegistrationResponse> = await api.post(
            apiUrl.registrationUser,data)

        return response.data
    },

    updateProfile: async (
        payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {

        const response : AxiosResponse<UpdateProfileResponse> = await api.put(apiUrl.updateProfile, payload)
      
        return response.data;
        },

    getProfile: async () => {
        const response: AxiosResponse<GetProfileResponse> = await api.get(apiUrl.getProfile)

        return response.data;
    },

    uploadProfileImage: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response: AxiosResponse<UploadProfilePicResponse> = await api.post(
        apiUrl.uploadProfileImage,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },

    updateProfileImageId: async (
        payload: UpdateProfilePic) => {

        const response : AxiosResponse<uploadProfilePicIdRes> = await api.put(apiUrl.updateProfile, payload)
      
        return response.data;
        },

    deleteProfileImage: async(imageId: string) => {
        const response: AxiosResponse<DeleteImageResponse> = await api.delete(apiUrl.deleteProfileImage(imageId))
    
        return response.data
    }

}