import axios from "../../../services/axios";

export const loginWithEmail = (email, password) => {
  return axios.post("/auth/login", { email, password });
};
