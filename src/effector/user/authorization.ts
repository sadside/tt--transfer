import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import AuthService from "../../services/AuthService";
import UserServices from "../../services/UserServices";
import {
  IFullUser,
  ILoginData,
  IRegistratinData,
  IUser,
} from "../../types/types";

export const registrationFormSubmit = createEvent<IRegistratinData>();
export const loginFormSubmit = createEvent<ILoginData>();
export const logout = createEvent();
export const userNotAuthorized = createEvent();

export const loginFx = createEffect<ILoginData, IUser, Error>(
  async ({ email, password }) => {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("token", response.data.access);
      return response.data;
    } catch (e: any) {
      if (e.response.status === 401) throw new Error("invalid form data");
    }
  }
);

export const registrationFx = createEffect<IRegistratinData, IFullUser, Error>(
  async (registrationFormData) => {
    try {
      const response = await AuthService.registration(registrationFormData);

      return response.data;
    } catch (e: any) {
      if (e.response.status === 400) {
        throw new Error("user already created");
      } else {
        throw new Error("some error");
      }
    }
  }
);

export const getTokenFx = createEffect(
  async ({ email, password }: { email: string; password: string }) => {
    const token = await AuthService.getToken({
      email,
      password,
    });

    localStorage.setItem("token", token.data.access);
  }
);

export const checkAuthFx = createEffect<undefined, IUser>(async () => {
  try {
    const response = await UserServices.checkAuth();

    localStorage.setItem("token", response.data.access);
    return response.data.user;
  } catch (e: any) {
    localStorage.removeItem("token");
    throw new Error("not authorized");
  }
});

const clearLocalStorageFx = createEffect(() => {
  localStorage.removeItem("token");
});

export const logoutFx = createEffect(async () => {
  await UserServices.logout();

  localStorage.removeItem("token");
});

forward({
  from: registrationFormSubmit,
  to: registrationFx,
});

forward({
  from: loginFormSubmit,
  to: loginFx,
});

forward({
  from: logout,
  to: logoutFx,
});

export const $user = createStore<IFullUser>({
  role: "",
  name: "",
  surname: "",
  patronymic: "",
  email: "",
  phone: "",
  password: "",
  news: [],
  accessToken: "",
  refreshToken: "",
  avatar: "",
  documents: [],
})
  .on(registrationFx.doneData, (_, user) => user)
  .on(checkAuthFx.doneData, (_, user) => user)
  .on(loginFx.doneData, (_, user: any) => user?.user)
  .reset(logout)
  .reset(checkAuthFx.failData)
  .reset(userNotAuthorized);


export const $loadingUserData = createStore(true)
  .on(checkAuthFx.doneData, () => false)
  .on(checkAuthFx.failData, () => false);

sample({
  clock: userNotAuthorized,
  fn: () => false,
  target: $loadingUserData,
});

sample({
  clock: registrationFx.doneData,
  source: $user,
  target: getTokenFx.prepend((user: IFullUser) => ({
    email: user.email || "",
    password: user.password || "",
  })),
});

forward({
  from: getTokenFx.doneData,
  to: checkAuthFx,
});


sample({
  clock: userNotAuthorized,
  target: clearLocalStorageFx,
});

export const $isAuth = createStore(false)
  .on(loginFx.doneData, () => true)
  .on(checkAuthFx.doneData, () => true)
  .reset(logout)
  .reset(checkAuthFx.failData);

export const $accountAlreadyCreated = createStore(false)
  .on(registrationFx.failData, (_, error) => {
    if (error.message === "user already created") return true;
  })
  .reset(registrationFx.doneData);

export const $invalidLoginForm = createStore(false)
  .on(loginFx.failData, (_, error) => {
    if (error.message === "invalid form data") return true;
  })
  .reset(loginFx.doneData);
