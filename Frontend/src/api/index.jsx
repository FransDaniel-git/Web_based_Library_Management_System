import axios from "axios";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: false,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};

export default createAxiosInstance;
