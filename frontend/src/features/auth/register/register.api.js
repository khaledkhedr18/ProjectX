import axios from "../../../services/axios";

export const registerWithEmail = (name, email, password) => {
  return axios.post("/auth/register", { name, email, password });
};

