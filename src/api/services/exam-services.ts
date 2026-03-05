import type { AxiosResponse } from "axios"
import type { ExamInstructionResponse } from "../model/exam-model"
import api from "."
import { apiUrl } from "../url"

export const examApi= {
    testInstruction: async (examId:string) => {
        const response: AxiosResponse<ExamInstructionResponse> =
        await api.get(apiUrl.examInstruction(examId));

        return response.data
    }
}