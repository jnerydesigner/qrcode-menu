import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3399",
  headers: {
    "Content-Type": "application/json",
  },
});
