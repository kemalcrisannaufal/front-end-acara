import { environtment } from "@/src/config/environtment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export interface CustomSession extends Session {
  accessToken?: string;
}

const headers = {
  "Content-type": "application/json",
};

const instance = axios.create({
  baseURL: environtment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: CustomSession | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default instance;
