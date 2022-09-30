import axios, { AxiosResponse } from "axios";
import $api from "../http";
import {
  CarClass,
  IInitialTariff,
  IService,
  IShortTariff,
  IShortTariffResponse,
  ITariff,
} from "../types/types";

export class TariffService {
  static getCarClasses() {
    return $api.get<CarClass[]>("cars/get-car-classes/");
  }
  static createTariff(tariff: IInitialTariff) {
    return $api.post<ITariff>("tariffs/tariff/", tariff);
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
    return $api.get<ITariff>(`tariffs/tariff/${id}/`);
  }

  static postTariff(tariff: any) {
    return $api.post("", tariff);
  }

  static getShortTariffs(
    limit = 1,
    page = 1,
    region = "",
    city = "",
    type = ""
  ) {
    switch (type) {
      case "Все":
        type = "";
        break;
      case "Комиссионный":
        type = "commission";
        break;
      case "Основной":
        type = "basic";
        break;
    }

    return $api.get<IShortTariffResponse>(`tariffs/tariff/`, {
      params: {
        page,
        limit,
        region,
        city,
        type,
      },
    });
  }

  static createCity(id: any, region: string, city: string) {
    return $api.post(`tariffs/tariff/${id}/intercity/city/`, {
      region,
      city,
    });
  }

  static deleteTariff(id: number) {
    return $api.delete<IShortTariff[]>(`tariffs/tariff/${id}/`);
  }
}
