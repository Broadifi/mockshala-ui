import type { AxiosResponse } from "axios"
import api from "."
import type { ExamCategories } from "../model/exam-categories" 
import { apiUrl } from "../url"

export const examCategoriesAPI = {
    examCategoriesData: async () => {
        const response: AxiosResponse<ExamCategories> = 
            await api.get(apiUrl.examCategories())

        return response.data
    },
}