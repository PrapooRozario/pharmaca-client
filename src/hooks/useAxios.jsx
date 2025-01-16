import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const axiosSecure = axiosPublic.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAxios = () => {
  return [axiosPublic, axiosSecure];
};

export default useAxios;
