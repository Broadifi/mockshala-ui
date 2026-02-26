import type { AxiosResponse } from "axios"
import type { EditorialCornerResponse ,EditorialCornerData} from "../model/editorial-corner"
import api from "."
import { apiUrl } from "../url"

interface FetchEditorial {
    page: number,
    limit: number,
    date?:string,
    tags?:string[]
}

// export async function fetchEditorialCorners({
//     page=1, limit, date, tags = []
// }:FetchEditorial){
//     const response: AxiosResponse<EditorialCornerResponse> = await api.get(apiUrl.editorialsCorner(),{
//         params:{
//             page,
//             limit,date,tags
//         }
//     })

//     return response.data
// }
export async function fetchEditorialCorners({
  page = 1,
  limit,
  date,
  tags = [],
}: FetchEditorial) {
  const response: AxiosResponse<EditorialCornerResponse> =
    await api.get(apiUrl.editorialsCorner(), {
      params: {
        page,
        limit,
        date,
        tags,
      },
    });

  return response.data;
}
export async function fetchEdtiorialCornerBySlug(slug:string):Promise<EditorialCornerData> {
      const response: AxiosResponse<EditorialCornerData> = 
            await api.get(apiUrl.editorialsCornerBySlug(slug))

        return response.data
}
// services/data.service.ts
import axios from "axios";

//  interface DataItem {
//   id: number;
//   title: string;
//   date: string;
// }

export const fetchEdtiorialCornerByDate = async (
  startDate: string,
  endDate: string
): Promise<EditorialCornerData> => {
  const response: AxiosResponse<EditorialCornerData>= await api.get(apiUrl.editorialsCorner(), {
    params: {
      startDate,
      endDate,
    },
  });

  return response.data;
};