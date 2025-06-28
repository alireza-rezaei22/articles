import { createContext } from "react";

const AlertContext = createContext({
    showAlertToast:()=>{},
    alert:{
        msg: null,
        isAlertShow: false,
        isSuccess: false
    }
})
export default AlertContext