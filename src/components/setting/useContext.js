import { useContext } from "react"
import DataContext from "./ContextData"


export const useLocalData=()=>{
    return useContext(DataContext);
}