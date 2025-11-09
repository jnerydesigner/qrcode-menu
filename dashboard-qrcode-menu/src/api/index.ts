import axios from "axios";
const baseUrl = "http://localhost:3399";

export const api = axios.create({
  baseURL: baseUrl,
});
