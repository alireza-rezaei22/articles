import { createContext } from "react";

export const AuthContext = createContext({
    login: ()=>{},
    logout: ()=>{},
    changeAlertValues: ()=>{},
    token: null,
    userInfo: null,
    isLoggedIn: false,
    alert: {
        route: null,
        isAlertShow: false,
        isSuccess: false
    },
})
