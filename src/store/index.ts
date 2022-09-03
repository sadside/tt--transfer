import { configureStore } from "@reduxjs/toolkit";
import { zoneAPI } from "../api/ZoneService";
import userReducer from "./userSlice";
import calculatorSlice from "./calculatorSlice";
import zoneReducer from "./zoneSlice";
import tariffReducer from "./tariffSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    calculator: calculatorSlice,
    zone: zoneReducer,
    tariff: tariffReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
