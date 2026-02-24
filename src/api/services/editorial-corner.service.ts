import type { AxiosResponse } from "axios"
import type { EditorialCornerResponse ,EditorialCornerData} from "../model/editorial-corner"
import api from "."
import { apiUrl } from "../url"

interface FetchEditorial {
    page: number,
    limit: number
}

export async function fetchEditorialCorners({
    page=1, limit
}:FetchEditorial){
    const response: AxiosResponse<EditorialCornerResponse> = await api.get(apiUrl.editorialsCorner(),{
        params:{
            page,
            limit
        }
    })

    return response.data
}
export async function fetchEdtiorialCornerBySlug(slug:string):Promise<EditorialCornerData> {
      const response: AxiosResponse<EditorialCornerData> = 
            await api.get(apiUrl.editorialsCornerBySlug(slug))

        return response.data
}