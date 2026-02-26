import type { AxiosResponse } from "axios";
import type { AuthLoginData, AuthOtpData, AuthRegistrationData, LoginResponse, OtpResponse, RegistrationResponse } from "../model/auth-model";
import api from ".";
import { apiUrl } from "../url";


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


}