/* eslint-disable @typescript-eslint/no-unused-vars */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://userapi.mockshala.com/api'

  export const apiUrl = {
    mobileLogin: '/auth/send-login-otp-mobile',


    banners: '/banners',

    popularTests: '/test-series/popular-exams',

    dashboardPaidCategories: '/exam-categories/dashboard?isPaid=true',

    allExamData: (examCategory: string) =>
       `/test-series/get-dashboard-test-series?examCategory=${examCategory}&isPaid=true&page=1&limit=12`,

    testDetails: (testSlug: string) =>`/test-series/by-slug/${testSlug}`,

    //  testDetails: (testSlug: string) =>`/test-series/by-slug/v2/${testSlug}`,

    currentAffairs: ()=> '/current-affairs',

    currentAffairsBySlug: (slug: string)=> `/current-affairs/by-slug/${slug}`,

    currentAffairsAllTags: ()=> '/current-affairs/tags',

    similarCurrentAffairs: (id: string) => `/current-affairs/get-similar-affairs/${id}`,

    siteConfig: ()=> '/site-configs',

    editorialsCorner: ()=> '/editorials',

    plans:() => '/plans'

      
  }

  export const IMAGE_BASE_URL = import.meta.env.VITE_PUBLIC_IMAGE_BASE_URL ?? "https://mockshala.s3.ap-south-1.amazonaws.com/";