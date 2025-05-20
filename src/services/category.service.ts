import instance from "../libs/axios/instance";
import { ICategory } from "../types/Category";
import endpoint from "./endpoint.constant";

const categoryServices = {
  addCategory: (payload: ICategory) =>
    instance.post(`${endpoint.CATEGORY}`, payload),
  getCategories: (params?: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
};

export default categoryServices;
