import type { AxiosResponse } from "axios";
import type { AuthLoginData, LoginResponse } from "../model/auth-model";
import api from ".";
import { apiUrl } from "../url";

export const authApi ={
    login: async(data:AuthLoginData) => {
        const response: AxiosResponse<LoginResponse> = await api.post(apiUrl.mobileLogin,data)

        return response.data
    }
}