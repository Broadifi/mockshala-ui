import type { AxiosResponse } from "axios";
import type { TestDetailsResponse } from "../model/test-model";
import api from ".";
import { apiUrl } from "../url";

export const testAPI = {
    getTestDetails: async (testSlug: string): Promise<TestDetailsResponse> =>
    {
        const response: AxiosResponse<TestDetailsResponse> = 
        await api.get(apiUrl.testDetails(testSlug))

        return response.data
    }
}