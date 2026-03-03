import type { AxiosResponse } from "axios";
import type { StateResponse } from "../model/general-model";
import { apiUrl } from "../url";
import api from ".";

export const generalApi = {

    state: async ()=> {

        const response:AxiosResponse<StateResponse> = await api.get(apiUrl.getState)

        return response.data
    }
}