import axios from "axios";
import $api, { API_URL } from "../http";

export default class AuthService {
  static async login(email, password) {
    return axios.post(
      `${API_URL}auth/token/`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  static async registration({
    email,
    password,
    name,
    surname,
    phone,
    patronymic,
    role,
  }) {
    return axios.post(`${API_URL}auth/create-user/`, {
      surname,
      name,
      patronymic,
      email,
      phone,
      password,
      role,
    });
  }

  static async getToken({ email, password }) {
    return $api.post("/auth/token/", {
      email,
      password,
    });
  }

  static async logout() {
    return $api.get("/auth/logout/");
  }
}
