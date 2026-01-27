import {  createExtendedQueryKeys } from './query-key-factory'

export const homeQueryKey = createExtendedQueryKeys('home', {
    banner: () => ['home', 'banner'] as const,

    popularTests:()=> ['home', 'popularTests'] as const,

    allTestSeries: ()=> ['home', "allTestSeries"] as const
  }
)

// Auth query keys for authentication operations
export const authQueryKeys = createExtendedQueryKeys('auth', {
  // Logout operations
  logout: () => ['auth', 'logout'] as const,

  // Password change operations
  changePassword: () => ['auth', 'changePassword'] as const,

 
})

export const queryKeys ={
    auth: authQueryKeys,
    home: homeQueryKey
}