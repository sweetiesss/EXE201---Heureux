

import APIServices from "./APIServices.ts";

class UnitOfWork{
    apiservices=APIServices;

    async fetchFilterClass(page:number,size:number,sort:string){
        const classes=await this.apiservices.getAPI(`/class/get-all?${page&&`page=${page}&`}${size&&`page=${size}&`}${sort&&`page=${sort}`}`);
       return classes;
    }
    //Task
    async fetchFilterTask(teamId:number){
        const result=await this.apiservices.getAPI(`/task${teamId&&`/team/${teamId}`}`);
        return result;
    }

    async deleteTask(taskId:number){
        const result=await this.apiservices.deleteAPI(`/task${taskId&&taskId}`);
        return result;
    }
}

export default new UnitOfWork();