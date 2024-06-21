import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLocalData } from "./useContext";
import { ToastWarning } from "./ToastSetting";


export default function AutherizonRequire({allowedAuth}){
    const {data}=useLocalData();
    const location=useLocation();
    console.log(data?.roleCode);
    console.log(data);
    if(allowedAuth.includes(data?.roleCode)){
        return <Outlet/>
    }else{
        ToastWarning("You are not allowed to access.");
        return <Navigate to="/" state={{ from: location }} replace />;
    }
}