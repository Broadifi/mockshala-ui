import type { User } from "@/api/model/auth-model";
import { cookiesKeys } from "@/lib/cookies.keys";
import { create } from "zustand";

interface AuthState {
  auth: {
    accessToken: string
    setAccessToken: (accessToken: string) => void
    userDetails: User | null
    setUserDetails: (details: User) => void
  }
}

export const useAuthStore = create<AuthState>()((set)=> {

    const storageUserDetails = window.localStorage.getItem(cookiesKeys.userDetails)

    const initToken:string =  window.localStorage.getItem(cookiesKeys.accessToken) ?? '';
    
    const  initUserDetails:User = storageUserDetails ? (JSON.parse(storageUserDetails)) : null


    return {
        auth:{
            accessToken: initToken,

            setAccessToken: (accessToken) => set((state)=>
            {
                window.localStorage.setItem(cookiesKeys.accessToken, accessToken);
                return {...state, auth:{...state.auth, accessToken}}
            }),

            userDetails: initUserDetails,

            setUserDetails: (userDetails) => set((state)=>{
                 window.localStorage.setItem(cookiesKeys.userDetails, JSON.stringify(userDetails));

                 return {...state, auth:{...state.auth, userDetails}}
            })
        }
    }
})