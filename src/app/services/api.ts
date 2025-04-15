import axios from "axios";
import { LoginSchema, RegisterSchema } from "../(auth)/utils/authSchema";
import { getToken, removeToken } from "../(auth)/utils/authLocalStorage";

/* 
type LoginResponse = {
  action_login: {
    token: string
  }
}
type RegisterResponse = {
  action_register: {
    token: string
  }
} */

const apiInstance = axios.create({baseURL: "https://assign-api.piton.com.tr/api/rest"});
apiInstance.interceptors.request.use(
  (config) => {
    if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = (data: LoginSchema) => apiInstance.post("/login", data);
export const register = (data: RegisterSchema) => apiInstance.post("/register", data);
export const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);
export const coverFetcher = (fileName: string) => apiInstance.post("/cover_image", {fileName: fileName}).then(res=>res.data.action_product_image.url)
export const likeFetcher = (url: string, {arg}: {arg:{user_id: number, product_id: number}}) => apiInstance.post(url, {user_id: arg.user_id, product_id: arg.product_id}).then(res=>res.data)

