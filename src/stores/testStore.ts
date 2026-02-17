import type { TestDetailsData } from "@/api/model/test-model";
import { create } from "zustand";

interface TestStore {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}



export const useTestDescriptionStore = create<TestStore>((set)=>({
    testData: null,
    setTestData: (data)=> set({testData: data}),
    clearTestData: () => set({testData:null})
    
}))

