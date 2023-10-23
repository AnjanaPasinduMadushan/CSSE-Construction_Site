import axios from "axios";
import { apiClient } from "../axios/api";

//Authentication Login
export const login = async (email, password) => {
  const response = await apiClient.post(`user/login`, {
    email: email,
    password: password,
  }, { withCredentials: true });

  return response.data;
};

//Authentication SignOut
export const signout = async () => {
  axios.defaults.withCredentials = true;
  const config = {
    withCredentials: true,
  };

  console.log("withCredentials:", config.withCredentials);

  const response = await apiClient.post('user/logout');
  return response.data;
};