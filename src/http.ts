import axios from "axios";
import { preferences, showToast, ToastStyle } from "@raycast/api";

const axiosInstance = axios.create({
  baseURL: `https://ones.ai/project/api/project/team/${preferences.teamUUID.value}`,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers["Ones-User-ID"] = preferences.userUUID.value;
  config.headers["Ones-Auth-Token"] = preferences.token.value;
  return config;
}, function (error) {
  console.log(error);
  showToast(ToastStyle.Failure, error);
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response.data;
  }
  return Promise.reject(response);
}, function (error) {
  console.log("response err:", error);
  showToast(ToastStyle.Failure, "response err");
  return Promise.reject(error);
});

export default axiosInstance;
