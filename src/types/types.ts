import moderation from "../components/moderation/Moderation";

export interface IUser {
  id: number;
  name: string;
  email: string;
  surname: string;
  patroimyc: string;
  phone: string;
  role: string;
  confirmed: boolean;
}

export interface IZone {
  id?: number;
  coordinates: string;
  color: string;
  region?: string | undefined;
  city?: string | undefined | ICity;
  title: string;
}

export interface ICity {
  id: number;
  country: string;
  region: string;
  city: string;
}

export interface IRegion {
  name: string;
  areas: [];
  id: number;
  parent_id: null | number;
}

export interface ICity {
  name: string;
  areas: [];
  id: number;
  parent_id: null | number;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistratinData {
  surname: string;
  name: string;
  patronymic: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IChangeUserData {
  email: string;
  phone: string;
  surname: string;
  name: string;
  patronymic: string;
}

export interface ICodeCheck {
  email: string;
  code: string;
}
export interface ISendPassword {
  email: string;
  code: string;
  password: string;
}

export interface IGetZone {
  region: string;
  city: string;
}

export interface IHub {
  title: string;
  description: string;
  city: string;
  region: string;
  longitude: number;
  latitude: number;
}

export interface ICarClass {
  carClass: string;
  img: any;
}

export interface IFullHub {
  city: {
    center: {
      id: number | null;
      latitude: number | null;
      longitude: number | null;
    };
    city: string;
    country: string;
    id: number | null;
    region: string;
  };
  coordinate: {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
  };
  description: string;
  id: number | null;
  title: string;
  slug?: string;
}

export interface IHubs {
  hubs: IFullHub[];
  city: any;
}

export interface IHubCity {
  country: string;
  region: string;
  city: string;
  id: number | null;

  center: {
    id: number | null;
    latitude: number | null;
    longitude: number | null;
  };
}

export interface IAddress {
  address: string;
  coordinates: {
    lat: number | null;
    lon: number | null;
  };
}

export interface IAdditionalRace {
  id: string;
  value: string;
  coordinates: Array<number>;
}

export interface ISuggestion {
  value: string;
  coordinates: number[];
}

export interface IBrokenAddress {
  address: string;
  coordinates: string;
}

export interface IServicePrice {
  id: number;
  car_class: string;
  customer_price: number;
  driver_price: number;
}

export interface IService {
  id: number;
  title: string;
  slug: string;
  prices?: IServicePrice[];
}

export interface IHubPrice {
  id: number;
  car_class: string;
  customer_price: number;
  driver_price: number;
}

export interface IFullZone {
  id: number;
  color: string;
  hub: number;
  coordinates: number[];
  title: string;
}

export interface IAdditionalHubZonePrice {
  id: number;
  zone: IFullZone;
  prices: IHubPrice[];
}

export interface IHubToPrice {
  id: number;
  hub: IFullHub;
  prices: IHubPrice[];
  additional_hubzone_prices: IAdditionalHubZonePrice[];
}

export interface IIntracityTariff {
  id: number;
  hub_to_prices: IHubToPrice[];
}

export interface IIntercityCity {
  id: number;
  prices: IServicePrice[];
  city: IHubCity;
  distance: number;
  hours_duration: number;
  minutes_duration: number;
}

export interface ITariff {
  id: number;
  title: string;
  city: {
    id: number;
    country: string;
    region: string;
    city: string;
    center: {
      id: number;
      latitude: number;
      longitude: number;
    };
  };
  currency: string;
  comments: string;
  is_commission: string;
  services: IService[];
  intracity_tariff: IIntracityTariff;
  intercity_tariff: {
    id: number;
    cities: IIntercityCity[];
    global_addresses: [];
  };
  lifetime: string;
}

export type CarClass = {
  title: string;
  slug: string;
};

export interface IInitialTariff {
  name: string;
  region: string;
  city: string;
}

export interface IShortTariffResponse {
  links: {
    next: null | number;
    previous: null | number;
  };
  count: number;
  results: IShortTariff[];
}

export interface IShortTariff {
  id: number;
  title: string;
  city: IHubCity;
  currency: string;
  is_commission: string;
  lifetime: string;
}
