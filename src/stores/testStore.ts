import type { Test } from "@/api/model/test-model";
import { create } from "zustand";

interface TestStore {
  tests: Test[];
  originalTests: Test[];
  setTests: (data: Test[]) => void;
  setOriginalTests: (data: Test[]) => void;
  filterTests:(data: Test[]) => void;
  // filterTests: (predicate: (test: Test) => boolean) => void;
  resetTests: () => void;
  clearTests: () => void;
}

export const useTestDescriptionStore = create<TestStore>((set)=>({
    tests: [],
    originalTests: [],
    setTests: (data) => set({ tests: data, originalTests: data }),
    setOriginalTests: (data) => set({ originalTests: data }),

    // filterTests: (predicate) => set((state) => ({
    //   tests: state.originalTests.filter(predicate)
    // })),

    filterTests: (data)=> set({tests:data}),
    
    resetTests: () => set((state) => ({ tests: state.originalTests })),
    clearTests: () => set({ tests: [], originalTests: [] })
}))

