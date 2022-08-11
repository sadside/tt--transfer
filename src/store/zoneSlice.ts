import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../http";
import { ZoneService } from "../services/ZoneService";
import { IGetZone, IZone } from "../types/types";
import { CalculatorState } from "./calculatorSlice";

type ZonesState = {
  zones: IZone[];
  loading: boolean;
  error: boolean;
};

const initialState: ZonesState = {
  zones: [],
  loading: false,
  error: false,
};

export const getZone = createAsyncThunk<
  IZone[],
  undefined,
  { rejectValue: string; state: { calculator: CalculatorState } }
>("zone/getZone", async (_, { rejectWithValue, getState }) => {
  const activeRegion = getState().calculator.activeRegion?.name;
  const activeCity = getState().calculator.activeCity?.name;

  try {
    const res: AxiosResponse<any> = await ZoneService.getZones(
      activeRegion,
      activeCity
    );

    return res.data;
  } catch (e: any) {
    rejectWithValue(e.message);
  }
});

export const addZoneThunk = createAsyncThunk<
  void,
  IZone,
  { rejectValue: string; state: { calculator: CalculatorState } }
>(
  "zone/addZoneThunk",
  async (data, { rejectWithValue, dispatch, getState }) => {
    const region = getState().calculator.activeRegion?.name;
    const city = getState().calculator.activeCity?.name;
    console.log({ ...data, region, city });
    try {
      const response = await ZoneService.addZone({ ...data, region, city });

      // @ts-ignore
      dispatch(getZone());
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const editZoneThunk = createAsyncThunk<
  IZone,
  IZone,
  { rejectValue: string }
>("zone/editZoneThunk", async (zone, { rejectWithValue }) => {
  try {
    const res = await ZoneService.editZone(zone);

    return zone;
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
      .addCase(getZone.fulfilled, (state, action) => {
        state.zones = action.payload;
      })
      .addCase(getZone.pending, (state) => {
        state.loading = true;
      })
      .addCase(editZoneThunk.fulfilled, (state, action) => {
        state.zones = state.zones.map((zone) => {
          if (zone.id === action.payload.id) {
            return action.payload;
          }
          return zone;
        });
      })
      .addCase(editZoneThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteZoneThunk.fulfilled, (state, action) => {
        state.zones = state.zones.filter((item) => item.id !== action.payload);
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
