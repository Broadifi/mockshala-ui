import type { AxiosResponse } from "axios";
import type { CurrentAffairsResponseAll, CurrentAffairsBySlugResponse, SimilarNewsResponse, CurrentAffairsAllFlagsRes } from "../model/current-affairs";
import { apiUrl } from "../url";
import api from ".";

interface CurrentAffairsPaginationParams{
    page?: number;
    limit?: number;
    date?: string;
    tags?: string[]
}

export async function fetchCurrentAffairs({
    page =1, limit, date, tags = []
}: CurrentAffairsPaginationParams): Promise<CurrentAffairsResponseAll>{
    const response:AxiosResponse<CurrentAffairsResponseAll>= await api.get(apiUrl.currentAffairs(),{
        params: {
            page,
            limit,
            date,
            tags
        },

        paramsSerializer: {indexes:null}
    })

    return response.data

}

export async function fetchCurrentAffairBySlug(slug:string):Promise<CurrentAffairsBySlugResponse> {
      const response: AxiosResponse<CurrentAffairsBySlugResponse> = 
            await api.get(apiUrl.currentAffairsBySlug(slug))

        return response.data
}

export async function fetchCurrentAffairAllTags():Promise<CurrentAffairsAllFlagsRes> {
      const response: AxiosResponse<CurrentAffairsAllFlagsRes> = 
            await api.get(apiUrl.currentAffairsAllTags())

        return response.data
}

export async function fetchSimilarNews(id:string) {
    const response: AxiosResponse<SimilarNewsResponse> = await api.get(apiUrl.similarCurrentAffairs(id))

    return response.data
}