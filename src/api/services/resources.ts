import type { AxiosResponse } from "axios";
import type { ResourcesResponse } from "../model/resource";

import api from ".";
import { apiUrl } from "../url";

type ParamsType = {
  page: number;
  limit: number;
  search?: string;
  examCategory?: string;
};

export const resourcesAPI = {
  getResources: async (
    page: number = 1,
    limit: number = 5,
    search?: string,
    examCategory?: string,
  ) => {
    const params :ParamsType= {
      page,
      limit,
    };
    if (search) {
      params.search = search;
    }
    if (examCategory) {
      params.examCategory = examCategory;
    }
    const response: AxiosResponse<ResourcesResponse> = await api.get(
      apiUrl.resources(),
      {
        params,
      },
    );

    return response.data;
  },
};
