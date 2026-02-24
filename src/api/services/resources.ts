import type { AxiosResponse } from "axios";
import type {ResourcesResponse} from "../model/resource"

import api from ".";
import { apiUrl } from "../url";



export const resourcesAPI = {
  getResources: async (page: number = 1, limit: number = 3, search?: string, category?: string) => {
    const response: AxiosResponse<ResourcesResponse> =
      await api.get(apiUrl.resources(), {
        params: {
            page,
            limit,
            ...(search ? { search } : {}), 
            ...(category ? { category } : {})
        }
      })
    console.log(response);
    
    return response.data
  }
}

