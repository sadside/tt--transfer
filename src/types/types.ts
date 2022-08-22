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
  longitude: number;
  latitude: number;
}
