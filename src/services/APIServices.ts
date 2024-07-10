import { ToastError } from "../components/setting/ToastSetting.js";
import { axiosConfig } from "./ApiConfig.ts";

class ApiServices {
  async getAPI(endpoint: string) {
    try {
      const res = await axiosConfig.get(endpoint);
      return res.data;
    } catch (e) {
      ToastError(e.response.data?.title);
      ToastError(e.response.data?.message);
    }
  }
  async postAPI(endpoint: string, data: any) {
    try {
      const res = await axiosConfig.post(endpoint, data);
      return res.data;
    } catch (e) {
      ToastError(e.response.data?.title);
      ToastError(e.response.data?.message);
    }
  }
  async putAPI(endpoint: string, data: any) {
    try {
      const res = await axiosConfig.put(endpoint, data);
      return res.data;
    } catch (e) {
      ToastError(e.response.data?.title);
      ToastError(e.response.data?.message);
    }
  }

  async deleteAPI(endpoint: string) {
    try {
      const res = await axiosConfig.delete(endpoint);
      return res.data;
    } catch (e) {
      ToastError(e.response.data?.title);
      ToastError(e.response.data?.message);
    }
  }
}
export default new ApiServices();
