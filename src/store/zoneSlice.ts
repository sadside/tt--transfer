import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Simulate } from "react-dom/test-utils";
import $api from "../http";
import { ZoneService } from "../services/ZoneService";
import { ICity, IGetZone, ISuggestion, IZone } from "../types/types";
import { CalculatorState } from "./calculatorSlice";

type ZonesState = {
  zones: IZone[];
  loading: boolean;
  error: boolean;
  suggestions: ISuggestion[];
};

const initialState: ZonesState = {
  zones: [],
  loading: false,
  error: false,
  suggestions: [],
};

export const createCity = createAsyncThunk<
  void,
  string,
  { rejectValue: string; state: { calculator: CalculatorState } }
>("zone/getZone", async (activeCity, { rejectWithValue, getState }) => {
  const activeRegion = getState().calculator.activeRegion;

  try {
    const res: AxiosResponse<any> = await ZoneService.createCity({
      region: activeRegion,
      city: activeCity,
    });
  } catch (e: any) {
    rejectWithValue(e.message);
  }
});

export const getSuggestions = createAsyncThunk<
  ISuggestion[],
  string,
  { rejectValue: string }
>("zone/getSuggestions", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: value,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",
        },
      }
    );

    return response.data.suggestions.map((suggestion: any) => {
      return {
        value: suggestion.value,
        coordinates: [suggestion.data["geo_lat"], suggestion.data["geo_lon"]],
      };
    });
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const getZonesById = createAsyncThunk<
  IZone[],
  number,
  { rejectValue: string; state: { calculator: CalculatorState } }
>("zone/getZone", async (hubId, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<any> = await ZoneService.getZonesById(hubId);

    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const addZoneThunk = createAsyncThunk<
  void,
  IZone,
  { rejectValue: string; state: { calculator: CalculatorState } }
>(
  "zone/addZoneThunk",
  async (
    { color, coordinates, title },
    { rejectWithValue, dispatch, getState }
  ) => {
    const hubId = getState().calculator.activeHub.id;

    try {
      await ZoneService.addZone(hubId, color, coordinates, title);

      if (hubId) dispatch(getZonesById(hubId));
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const editZoneThunk = createAsyncThunk<
  IZone[],
  IZone,
  { rejectValue: string }
>("zone/editZoneThunk", async (zone, { rejectWithValue }) => {
  try {
    const res = await ZoneService.editZone(zone);

    return res.data;
  } catch (e: any) {
    return rejectWithValue(e.messages);
  }
});

export const deleteZoneThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("zone/deleteZoneThunk", async (id, { rejectWithValue }) => {
  try {
    const res = await ZoneService.deleteZone(id);

    return id;
  } catch (e) {
    return rejectWithValue("Произошла ошибка");
  }
});

const zoneSlice = createSlice({
  name: "zone",
  initialState: initialState,
  reducers: {
    setZones(state, action: PayloadAction<IZone[]>) {
      state.zones = action.payload;
    },
    addZone(state, action: PayloadAction<IZone>) {
      state.zones.push(action.payload);
    },
    deleteZone(state, action: PayloadAction<number | undefined>) {
      state.zones = state.zones.filter((item) => item.id !== action.payload);
    },
    editZone(state, action) {
      state.zones = state.zones.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getZonesById.fulfilled, (state, action) => {
        state.zones = action.payload;
      })
      .addCase(getZonesById.pending, (state) => {
        state.loading = true;
      })
      .addCase(editZoneThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload;
      })
      .addCase(editZoneThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteZoneThunk.fulfilled, (state, action) => {
        state.zones = state.zones.filter((item) => item.id !== action.payload);
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { addZone, deleteZone, editZone } = zoneSlice.actions;

export default zoneSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
