import type {AxiosResponse } from "axios";
import api from ".";
import { apiUrl } from "../url";
import type { PlansResponse } from "../model/plan-model";

export async function fetchPlansData() {
    const response: AxiosResponse<PlansResponse> = await api.get(apiUrl.plans());

    return response.data
}