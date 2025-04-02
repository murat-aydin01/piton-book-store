import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://assign-api.piton.com.tr/api/rest",
});

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data)

export default fetcher