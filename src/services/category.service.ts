import instance from "../libs/axios/instance";
import { ICategory } from "../types/Category";
import endpoint from "./endpoint.constant";

const categoryServices = {
  addCategory: (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORY}`, payload),
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  updateCategory: (id: string, payload: ICategory) =>
    instance.put(`${endpoint.CATEGORY}/${id}`, payload),
  deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
};

export default categoryServices;
