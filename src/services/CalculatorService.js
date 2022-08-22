import axios from "axios";
import $api from "../http";

export default class CalculatorService {
  static async getCities() {
    return axios.get("https://api.hh.ru/areas");
  }

  static getHubs(region, city) {
    return $api.get(`address/hub/?region=${region}&city=${city}`);
  }
}
