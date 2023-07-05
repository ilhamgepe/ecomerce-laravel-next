import Axios from "axios";
Axios.defaults.headers.common["Accept"] = "aplication/json";
Axios.defaults.headers.common["Content-Type"] = "aplication/json";
const baseURL = "http://localhost:3000";
const axios = Axios.create({
  ...Axios.defaults,
  baseURL: process.env.BASE_SERVER_URL,
  withCredentials: true,
  headers: {
    Accept: "aplication/json",
  },
});

const axiosClient = Axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "aplication/json",
  },
});

export { axios, axiosClient };
