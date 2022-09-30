import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import $api, { API_URL } from "../http";
import AuthService from "../services/AuthService";
import axios from "axios";
import UserServices from "../services/UserServices";
import {
  IChangePassword,
  IChangeUserData,
  ICodeCheck,
  IFullUser,
  ILoginData,
  IRegistratinData,
  ISendPassword,
  IUser,
} from "../types/types";

type UserState = {
  user: IFullUser;
  loading: boolean;
  isAuth: boolean;
  passwordMatch: null | string;
  showCodeField: boolean;
  showPasswordField: boolean;
  statusEmail: null | string;
  statusCode: null | string;
  statusPassword: null | string;
  emailError: null | string;
  codeError: null | string;
  passwordError: null | string;
  status: null | string | undefined;
  error: string;
};

const initialState: UserState = {
  user: {
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
  },
  loading: true,
  isAuth: false,
  passwordMatch: null,
  showCodeField: false,
  showPasswordField: false,
  statusEmail: null,
  statusCode: null,
  statusPassword: null,
  emailError: null,
  codeError: null,
  passwordError: null,
  status: null,
  error: "",
};

export const login = createAsyncThunk<
  void,
  ILoginData,
  { rejectValue: string }
>(
  "user/login",
  async function ({ email, password }, { rejectWithValue, dispatch }) {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("token", response.data.access);
      // redirect => checkAuth() is called
      window.location.href = "/";
    } catch (e: any) {
      if (e.response.status == 401) {
        dispatch(setStatus("invalid data"));
      }

      if (e.response.statusText !== "OK") {
        return rejectWithValue("Произошла ошибка. Попробуйте позднее.");
      }
    }
  }
);

export const registration = createAsyncThunk<
  void,
  IRegistratinData,
  { rejectValue: string }
>(
  "user/registration",
  async function (
    { surname, name, patronymic, email, phone, password, role },
    { rejectWithValue }
  ) {
    try {
      // const response = await AuthService.registration(
      //   email,
      //   password,
      //   name,
      //   surname,
      //   phone,
      //   patronymic,
      //   role
      // );

      const token = await AuthService.getToken({
        email,
        password,
      });

      localStorage.setItem("token", token.data.access);
      window.location.href = "/";
    } catch (e: any) {
      if (e.response.statusText !== "OK") {
        if (e.response.status === 400) {
          return rejectWithValue("Пользователь уже создан");
        }

        return rejectWithValue("Произошла ошибка повторите попытку позднее.");
      }
    }
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  { rejectValue: string }
>("user/logout", async function (_, { rejectWithValue }) {
  const response = await axios.get(`${API_URL}auth/logout/`, {
    withCredentials: true,
  });

  if (response.statusText !== "OK") {
    window.location.href = "/";
    return rejectWithValue("Произошла ошибка при выходе");
  }

  localStorage.removeItem("token");
});

export const changePassword = createAsyncThunk<
  void,
  IChangePassword,
  { rejectValue: string }
>(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await UserServices.changePassword(
        oldPassword,
        newPassword
      );
    } catch (e) {
      return rejectWithValue("Введите корректный старый пароль");
    }
  }
);

// TODO: Узнать про отправку новой даты на сервер

export const changeUserData = createAsyncThunk<
  IChangeUserData,
  IChangeUserData,
  { rejectValue: string }
>("user/changeUserData", async (data, { rejectWithValue }) => {
  try {
    const response = await UserServices.changeUserData(data);

    return data;
  } catch (e) {
    return rejectWithValue("Произошла ошибка, попробуйте позднее.");
  }
});

export const setAvatar = createAsyncThunk<
  string,
  FormData,
  { rejectValue: string }
>("user/setAvatar", async (avatar, { rejectWithValue }) => {
  try {
    const response = await UserServices.postAvatar(avatar);

    return response.data.avatar;
  } catch (e) {
    return rejectWithValue("Произошла ошибка, попробуйте позже.");
  }
});

export const setDocuments = createAsyncThunk<
  string[],
  FormData,
  { rejectValue: string }
>("user/setDocuments", async (documents, { rejectWithValue }) => {
  try {
    const response = await UserServices.postDocuments(documents);

    return response.data.documents;
  } catch (e) {
    return rejectWithValue("Произошла ошибка, попробуйте позднее.");
  }
});

export const resetPassword = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("user/resetPassword", async (email, { dispatch }) => {
  try {
    const response = await UserServices.resetPassword(email);
    dispatch(setShowCodeField(true));
    dispatch(setEmailError(null));
  } catch (e) {
    dispatch(setEmailError("Ошибка с почтой"));
  }
});

export const sendCode = createAsyncThunk<
  void,
  ICodeCheck,
  { rejectValue: string }
>("user/sendCode", async (data, { dispatch }) => {
  try {
    const response = await UserServices.sendCode(data);
    dispatch(setShowPasswordField(true));
    dispatch(setCodeError(null));
  } catch (e) {
    dispatch(setCodeError("Неверный код подтверждения"));
  }
});

export const sendPassword = createAsyncThunk<
  void,
  ISendPassword,
  { rejectValue: string }
>("user/sendPassword", async ({ email, code, password }, { dispatch }) => {
  try {
    const response = await UserServices.sendPassword(code, email, password);

    dispatch(setPasswordError(null));
    window.location.href = "/success";
  } catch (e) {
    dispatch(setPasswordError("Введите корректный пароль"));
  }
});

export const checkAuth = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>("user/checkAuth", async function (_, { dispatch, rejectWithValue }) {
  try {
    const response = await UserServices.checkAuth();

    localStorage.setItem("token", response.data.access);
    return response.data.user;
  } catch (e) {
    localStorage.removeItem("token");
    dispatch(setIsAuth(false));
    dispatch(setFullUser({}));
    window.location.href = "/login";
    return rejectWithValue("Вы не авторизованы");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAvatarLink(state, action) {
      state.user.avatar = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setFullUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setShowCodeField(state, action) {
      state.showCodeField = action.payload;
    },
    setShowPasswordField(state, action) {
      state.showPasswordField = action.payload;
    },
    setPasswordError(state, action) {
      state.passwordError = action.payload;
    },
    setCodeError(state, action) {
      state.codeError = action.payload;
    },
    setEmailError(state, action) {
      state.emailError = action.payload;
    },
    setPasswordMatch(state, action) {
      state.passwordMatch = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isAuth = false;
      })
      // .addCase(changeUserData.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(changeUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(setAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(setAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user.avatar = action.payload;
      })
      .addCase(setDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(setDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.user.documents = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.statusEmail = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.statusEmail = "resolved";
      })
      .addCase(resetPassword.rejected, (state) => {
        state.emailError = "Неверный email";
      })
      .addCase(sendCode.pending, (state) => {
        state.statusCode = "loading";
      })
      .addCase(sendCode.fulfilled, (state) => {
        state.statusCode = "resolved";
      })
      .addCase(sendCode.rejected, (state) => {
        state.codeError = "Неверный код подтверждения";
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        localStorage.removeItem("token");
        state.loading = false;
        state.isAuth = false;
        state.user = {};
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      });
  },
});

export const {
  setIsAuth,
  setShowCodeField,
  setShowPasswordField,
  setPasswordError,
  setCodeError,
  setEmailError,
  setFullUser,
  setPasswordMatch,
  setStatus,
} = userSlice.actions;

export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
