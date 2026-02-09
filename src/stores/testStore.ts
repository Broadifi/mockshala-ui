import type { TestDetailsData } from "@/api/model/test-model";
import { create } from "zustand";

interface TestStore {
  testData: TestDetailsData | null;
  setTestData: (data: TestDetailsData) => void;
  clearTestData: () => void;
}

interface LanguageStore{
  currentLang: string ;
  setLanguage: (data:string) => void;
   clearLanguage: () => void;
}

export const useTestDescriptionStore = create<TestStore>((set)=>({
    testData: null,
    setTestData: (data)=> set({testData: data}),
    clearTestData: () => set({testData:null})
    
}))

export const useNewsLanguage = create<LanguageStore>((set)=>({
  currentLang: 'en',
  setLanguage: (data)=> set({currentLang: data}),
  clearLanguage: () => set({currentLang:'en'})
}))