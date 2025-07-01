import instance from "../libs/axios/instance";
import { ICart } from "../types/Ticket";
import endpoint from "./endpoint.constant";

const orderServices = {
  createOrder: (payload: ICart) => instance.post(`${endpoint.ORDER}`, payload),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${id}/${status}`),
  getMemberOrder: (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
};

export default orderServices;
