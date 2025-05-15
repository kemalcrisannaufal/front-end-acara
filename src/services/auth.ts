import instance from "../libs/axios/instance";
import { IRegister } from "../types/Auth";
import endpoint from "./endpoint.constant";

const AuthServices = {
  register: (payload: IRegister) =>
    instance.post(endpoint.AUTH_REGISTER, payload),
};

export default AuthServices;
