import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LoginStore{
    loginState: boolean ;
    setLoginState: (value:boolean) => void
}

export const useLoginStore = create<LoginStore>()(
    persist(
        (set)=> ({
            loginState: false,

            setLoginState: (value) =>
                set({loginState: value})
        }),
        {
            name: 'global-login-state'
        }
    )
)