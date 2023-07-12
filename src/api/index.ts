import axios from "axios";
export const domainUrl = "https://www.themealdb.com/api/json/v1/1";

export const axiosInstance = axios.create({
  baseURL: domainUrl,
  timeout: 100000,
});
