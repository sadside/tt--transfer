import axios from "axios";
import $api from "../http";

export default class CalculatorService {
  static async getCities() {
    return axios.get("https://api.hh.ru/areas");
  }

  static async createZone(zone: any) {
    return $api.post("address/add-city-zone/", zone);
  }

  static getHubs(region: string, city: string) {
    return $api.get(`address/hub/?region=${region}&city=${city}`);
  }

  static addHub(data: any) {
    return $api.post("address/hub/", data);
  }

  static addBrokenAddress({ address, coordinates }: any) {
    return $api.post("address/hub/", { address, coordinates });
  }
}
