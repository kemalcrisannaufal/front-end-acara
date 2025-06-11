import instance from "../libs/axios/instance";
import { ICart } from "../types/Ticket";
import endpoint from "./endpoint.constant";

const orderServices = {
  createOrder: (payload: ICart) => instance.post(`${endpoint.ORDER}`, payload),
};

export default orderServices;
