import axios_ from "axios";

export const axiosClient = axios_.create({
  baseURL: "http://localhost:3001/pikmi-client",
  validateStatus: (status) => status < 300,
})

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("session");
  if (token) {
    config.headers["authorization"] = token
  }
  return config;
});