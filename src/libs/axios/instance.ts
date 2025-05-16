import { environment } from "@/src/config/environment";
import { SessionExtended } from "@/src/types/Auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error),
);

export default instance;
