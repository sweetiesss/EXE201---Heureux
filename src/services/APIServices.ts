import { axiosConfig } from "./ApiConfig.ts";

class ApiServices {
  async getAPI(endpoint: string) {
    try {
      const res = await axiosConfig.get(endpoint);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
  async postAPI(endpoint: string, data: any) {
    try {
      const res = await axiosConfig.post(endpoint, data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
  async putAPI(endpoint: string, data: any) {
    try {
      const res = await axiosConfig.put(endpoint, data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAPI(endpoint: string) {
    try {
      const res = await axiosConfig.delete(endpoint);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
}
export default new ApiServices();
