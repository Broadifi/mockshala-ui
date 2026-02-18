import type { AxiosResponse } from "axios"
import api from "."
import type { SiteConfigResponse } from "../model/siteConfig-model"
import { apiUrl } from "../url"

export const siteConfigAPI = {
    siteConfigData:  async () => {
        const response: AxiosResponse<SiteConfigResponse> = 
            await api.get(apiUrl.siteConfig())

        return response.data
    },
}