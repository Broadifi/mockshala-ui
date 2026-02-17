import type { AllExamResponse, BannerResponse, CurrentAffairsResponse, DashboardPaidCategoriesResponse, PopularTestResponse } from "../model/home-model";
import axios, { type AxiosResponse } from 'axios'
import { apiUrl, BASE_URL } from "../url";
import api from ".";

export const homeAPI = {
    getBannerData : async (): Promise<BannerResponse> =>{
        const response: AxiosResponse<BannerResponse> = await axios.get(`${BASE_URL}${apiUrl.banners}`)

        return response.data
       
    },

    getPopularTestData:  async () =>{
        const response: AxiosResponse<PopularTestResponse> = await axios.get(`${BASE_URL}${apiUrl.popularTests}`)
        
        return response.data
    
    },

    getDashboardPaidCategories:  async(): Promise<DashboardPaidCategoriesResponse> =>{
        const response: AxiosResponse<DashboardPaidCategoriesResponse> =
         await axios.get(`${BASE_URL}${apiUrl.dashboardPaidCategories}`)

         return response.data
    },

    getAllExamByCategory:  async (examCategory: string): Promise<AllExamResponse> => {
        const response: AxiosResponse<AllExamResponse> = 
            await api.get(apiUrl.allExamData(examCategory))

        return response.data
    },

    getCurrentAffairsData:  async (): Promise<CurrentAffairsResponse> => {
        const response: AxiosResponse<CurrentAffairsResponse> = 
            await api.get(apiUrl.currentAffairs())

        return response.data
    },
}