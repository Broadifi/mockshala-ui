import type { PopularTestData } from "@/api/model/home-model";
import { create } from "zustand";

interface PopularStore {
  popularData: PopularTestData[] | null;
  setPopularData: (data: PopularTestData[]) => void;
  clearPopularData: () => void;
}


export const usePopularTestData = create<PopularStore>((set)=>({
    popularData: null,
    setPopularData: (data)=> set({popularData: data}),
    clearPopularData: () => set({popularData:null})
}))