import axios from "axios";
import $api, { API_URL } from "../http";

export default class UserServices {
  static changePassword(oldPassword, newPassword) {
    return $api.post("profile/edit/change-password/", {
      oldPassword,
      newPassword,
    });
  }

  static changeUserData({ email, phone, surname, name, patronymic }) {
    return $api.post("profile/edit/user-data/", {
      name,
      surname,
      phone,
      email,
      patronymic,
    });
  }

  static sendAvatar(avatar) {
    return $api.post("profile/avatar/", { avatar });
  }

  static resetPassword(email) {
    return axios.post(`${API_URL}auth/reset-password/get-code/`, {
      email,
    });
  }

  static sendCode(data) {
    return axios.post(`${API_URL}auth/reset-password/check-code/`, data);
  }

  static sendPassword(code, email, password) {
    return axios.post(`${API_URL}auth/reset-password/`, {
      code,
      email,
      password,
    });
  }

  static postAvatar(avatar) {
    return $api.post("profile/avatar/", avatar);
  }

  static postDocuments(documents) {
    return $api.post("profile/documents/", documents);
  }

  static checkAuth() {
    return axios.post(
      `${API_URL}auth/token/refresh/`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  static logout() {
    return axios.get(`${API_URL}auth/logout/`, {
      withCredentials: true,
    });
  }
}
