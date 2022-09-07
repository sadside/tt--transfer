import axios, { AxiosResponse } from "axios";
import $api from "../http";
import { CarClass, IInitialTariff, IService, ITariff } from "../types/types";

export class TariffService {
  static getCarClasses() {
    return $api.get<CarClass[]>("cars/get-car-classes/");
  }
  static createTariff(tariff: IInitialTariff) {
    return $api.post<ITariff>("tariffs/tariff/", {
      title: tariff.name,
      region: tariff.region,
      city: tariff.city,
    });
  }

  static getRegionSuggestions(string: string) {
    return $api.get("address/filter-regions", {
      params: {
        search: string,
      },
    });
  }

  static getTariffServices() {
    return $api.get<IService[]>("");
  }

  static getCitySuggestions(region: string, string: string) {
    return $api.get("address/filter-cities", {
      params: {
        region,
        search: string,
      },
    });
  }

  static editTariffPrice(tariff: any, id: any) {
    return $api.put<ITariff>(`tariffs/edit-prices/${id}/`, tariff);
  }

  static getTariffById(id: number) {
    return $api.get<ITariff>(`//${id}`);
  }

  static postTariff(tariff: any) {
    return $api.post("", tariff);
  }
}
