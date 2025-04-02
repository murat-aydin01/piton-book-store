import axios from "axios";
import { LoginSchema, RegisterSchema } from "../(auth)/utils/authSchema";

const authInstance = axios.create({baseURL: "https://assign-api.piton.com.tr/api/rest"});
const apiInstance = axios.create({baseURL: "https://assign-api.piton.com.tr/api/rest"});
// TODO token kontrolü yapılacak
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetcher = (url: string) =>
  authInstance.get(url).then((res) => res.data);

const authRequest = async (
  endpoint: string,
  data: LoginSchema | RegisterSchema
) => {
  try {
    const response = await authInstance.post(endpoint, data);
    const token = response.data?.[`action_${endpoint.replace("/", "")}`]?.token;

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/"
    } else {
      throw new Error("Token alınamadı");
    }

    return response.data;
  } catch (error) {
    console.error(`Hata: ${error}`);
    throw error;
  }
};

export const login = (data: LoginSchema) => authRequest("/login", data);

export const register = (data: RegisterSchema) =>
  authRequest("/register", data);
