import axios from "axios";

const axiosInstanceToApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceToApi.interceptors.request.use((request) => {
  return request;
});

axiosInstanceToApi.interceptors.response.use((response) => {
  return response;
});

export default axiosInstanceToApi;
