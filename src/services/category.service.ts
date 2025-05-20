import instance from "../libs/axios/instance";
import { ICategory } from "../types/Category";
import endpoint from "./endpoint.constant";

const categoryServices = {
  addCategory: (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORY}`, payload),
  getCategory: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
