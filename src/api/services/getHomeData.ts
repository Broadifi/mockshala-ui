import type { BannerResponse, DashboardPaidCategoriesResponse, PopularTestResponse } from "../model/home-model";
import axios, { type AxiosResponse } from 'axios'
import { apiUrl, BASE_URL } from "../url";

export const homeAPI = {
    getBannerData : async (): Promise<BannerResponse> =>{
        const response: AxiosResponse<BannerResponse> = await axios.get(`${BASE_URL}${apiUrl.banners}`)

        return response.data
       
    },

    getPopularTestData:  async (): Promise<PopularTestResponse> =>{
        const response: AxiosResponse<PopularTestResponse> = await axios.get(`${BASE_URL}${apiUrl.popularTests}`)
        
        return response.data
    
    },

    getDashboardPaidCategories:  async(): Promise<DashboardPaidCategoriesResponse> =>{
        const response: AxiosResponse<DashboardPaidCategoriesResponse> =
         await axios.get(`${BASE_URL}${apiUrl.dashboardPaidCategories}`)

         return response.data
    }
}