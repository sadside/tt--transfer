import axios from "axios";
import $api from "../http";
import { CarClass } from "../types/types";

export class TariffService {
  static getCarClasses() {
    return $api.get<CarClass[]>("cars/get-car-classes/");
  }
  static createTariff(data: any) {
    return $api.post("//", data);
  }

  static getRegionSuggestions(string: string) {
    return $api.get("", {
      params: {
        search: string,
      },
    });
  }

  static getCitySuggestions(region: string, string: string) {
    return $api.get("", {
      params: {
        region,
        search: string,
      },
    });
  }
}
