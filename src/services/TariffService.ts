import axios, { AxiosResponse } from "axios";
import $api from "../http";
import {
  CarClass,
  IInitialGlobalAddress,
  IInitialTariff,
  IIntercityCity,
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

  static addGlobalAddress(address: any) {
    return $api.post("address/global-address/", address);
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

  static createRouteWithGlobalAddress(route: string, id: number) {
    return $api.post(`tariffs/tariff/${id}/intercity/global-address/`, {
      global_address: route,
    });
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

  static postTariff(tariff: any, id: number) {
    return $api.put(`tariffs/tariff/${id}/`, tariff);
  }

  static deleteIntercityRoad(tariffId: number, cityId: number) {
    return $api.delete<IIntercityCity[]>(
      `tariffs/tariff/${tariffId}/intercity/city/${cityId}/`
    );
  }

  static getGlobalAddressesSuggestions(address: string) {
    return $api.get("address/search-global-addresses", {
      params: {
        search: address,
      },
    });
  }

  static getHubsSuggestions(string: string) {
    return $api.get<string[]>("", {
      params: {
        hub: string,
      },
    });
  }

  static getShortTariffs(
    limit = 1,
    page = 1,
    region = "",
    city = "",
    type = "",
    isActive = ""
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

    if (isActive === "Все") isActive = "";

    return $api.get<IShortTariffResponse>(`tariffs/tariff/`, {
      params: {
        page,
        limit,
        region,
        city,
        type,
        is_available: isActive,
      },
    });
  }

  static createCity(id: any, region: string, city: string) {
    return $api.post(`tariffs/tariff/${id}/intercity/city/`, {
      region,
      city,
    });
  }

  static createRouteWithHub(hub: string) {
    return $api.post("", hub);
  }

  static deleteTariff(id: number) {
    return $api.delete<IShortTariff[]>(`tariffs/tariff/${id}/`);
  }
}
