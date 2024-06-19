import {axiosConfig} from "./ApiConfig.ts";

class ApiServices{
        async getAPI(endpoint:string){
        try{
            const res=await axiosConfig.get(endpoint);
            return res.data;
        }catch(e){
            console.log(e);
            throw e;
        }
    }
    async postAPI(endpoint:string,data:any){
        try{
            const res=await axiosConfig.post(endpoint,data);
            return res.data;
        }catch(e){
            console.log(e);
            throw e;
        }
    }

    async deleteAPI(endpoint:string){
        try{
            const res=await axiosConfig.delete(endpoint);
            return res.data;
        }catch(e){
            console.log(e);
            throw e
            
        }
    }
}
export default new ApiServices();