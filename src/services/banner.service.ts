import instance from "../libs/axios/instance";
import { IBanner } from "../types/Banner";
import endpoint from "./endpoint.constant";

const bannerServices = {
  createBanner: (payload: IBanner) =>
    instance.post(`${endpoint.BANNER}`, payload),
  getBanners: (params: string) => instance.get(`${endpoint.BANNER}?${params}`),
  getBannerById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  updateBanner: (id: string, payload: IBanner) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
  deleteBanner: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
};

export default bannerServices;
