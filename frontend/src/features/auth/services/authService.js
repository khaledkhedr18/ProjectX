import axios from "../../../services/axios";

export const login = (email, password) => axios.post("/auth/login", { email, password });

export const logout = () => {
  localStorage.removeItem("token");
};