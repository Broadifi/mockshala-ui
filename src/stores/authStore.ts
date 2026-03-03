import type { GetProfileData } from "@/api/model/auth-model";
import { cookiesKeys } from "@/lib/cookies.keys";
import Cookies from "js-cookie";
import { create } from "zustand";

interface AuthState {
  auth: {
    accessToken: string
    setAccessToken: (accessToken: string) => void
    userDetails: GetProfileData | null
    setUserDetails: (details: GetProfileData) => void
    logout: () => void
  }
}

export const useAuthStore = create<AuthState>()((set)=> {

    const initToken:string =  Cookies.get(cookiesKeys.accessToken) ?? '';


    const storageUserDetails = window.localStorage.getItem(cookiesKeys.userDetails)

    
    const  initUserDetails: GetProfileData | null = 
    storageUserDetails ? (JSON.parse(storageUserDetails)) : null


    return {
        auth:{
            accessToken: initToken,

            setAccessToken: (accessToken) => set((state)=>
            {
                // window.localStorage.setItem(cookiesKeys.accessToken, accessToken);
                Cookies.set(cookiesKeys.accessToken, accessToken);

                return {...state, auth:{...state.auth, accessToken}}
            }),

            userDetails: initUserDetails,

            setUserDetails: (userDetails) => set((state)=>{
                 window.localStorage.setItem(cookiesKeys.userDetails, JSON.stringify(userDetails));

                 return {...state, auth:{...state.auth, userDetails}}
            }),

            logout: () => set((state)=> {
                Cookies.remove(cookiesKeys.accessToken)
                
                 window.localStorage.removeItem(cookiesKeys.userDetails);
                 
                 return {...state, auth:{...state.auth, accessToken: '', userDetails: null}}
            }),

        }
    }
})