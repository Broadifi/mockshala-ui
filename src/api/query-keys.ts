import {  createExtendedQueryKeys } from './query-key-factory'

export const homeQueryKey = createExtendedQueryKeys('home', {
    banner: () => ['home', 'banner'] as const,

    popularTests:()=> ['home', 'popularTests'] as const,

    paidTestCategories: ()=> ['home', "paidTestCategories"] as const,

    allTestSeries: (slug)=> ['home', 'allTestSeries',slug] as const,

    currentAffairs: ()=> ['home', 'currentAffairs'] as const,

  }
)

export const testDescriptionKey = createExtendedQueryKeys('test',{
  testDetails : (examCat,slug) => ['test','testDetails', examCat, slug] as const
})

// Auth query keys for authentication operations
export const authQueryKeys = createExtendedQueryKeys('auth', {
  // Logout operations
  logout: () => ['auth', 'logout'] as const,

  // Password change operations
  changePassword: () => ['auth', 'changePassword'] as const,

 
})

export const currentAffairsKeys = createExtendedQueryKeys('currentAffairs',{
  currentAffairsDetails: (date, slug) => ['currentAffairs', 'currentAffairsDetails', date, slug],

  newsFlags : ()=> ['currentAffairs', 'newsFlags'] as const,

  similarNews: (id)=> ['currentAffairs', 'similarNews', id] as const,
})

export const siteConfigsKeys = createExtendedQueryKeys('siteConfigsKeys',{
  siteConfigsDetails: ()=> ['siteConfigsKeys','siteConfigsDetails'] as const
})


export const editorialsCornerKeys= createExtendedQueryKeys('editorialsCorner',{
  editorialsCornerDetails: (page: number, limit: number) => ['editorialsCorner',page , limit] as const
})

export const plansKeys = createExtendedQueryKeys('plans',{
  plansDetails: ()=> ['plans', 'plansDetails'] as const
})

export const queryKeys ={
    auth: authQueryKeys,
    home: homeQueryKey,
    testKey: testDescriptionKey,
    currentAffairsKeys ,
    siteConfigsKeys,
    editorialsCornerKeys,
    plansKeys
}