import type { AxiosResponse } from "axios"
import type { ExamInstructionResponse, StartExamResponse } from "../model/exam-model"
import api from "."
import { apiUrl } from "../url"

export interface ExamProps {
    testSeries: string;
    test: string;
}

export const examApi= {
    testInstruction: async (examId:string) => {
           
        const response: AxiosResponse<ExamInstructionResponse> =
        await api.get(apiUrl.examInstruction(examId));

        return response.data.data
    },

    startExam: async (data: ExamProps)=>{
        const response: AxiosResponse<StartExamResponse> =
        await api.post(apiUrl.startExam, data);

        return response.data
    }
}