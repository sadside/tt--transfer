import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import $api from "../http";
import { ZoneService } from "../services/ZoneService";
import { ICity, IGetZone, IZone } from "../types/types";
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
export const createCity = createAsyncThunk<
  void,
  string,
  { rejectValue: string; state: { calculator: CalculatorState } }
>("zone/getZone", async (activeCity, { rejectWithValue, getState }) => {
  const activeRegion = getState().calculator.activeRegion?.name;

  try {
    const res: AxiosResponse<any> = await ZoneService.createCity({
      region: activeRegion,
      city: activeCity,
    });
  } catch (e: any) {
    rejectWithValue(e.message);
  }
});

// export const getZones = createAsyncThunk<
//   IZone[],
//   undefined,
//   { rejectValue: string; state: { calculator: CalculatorState } }
// >("zone/getZone", async (_, { rejectWithValue }) => {
//   try {
//     const res: AxiosResponse<any> = await ZoneService.getZones();
//
//     return res.data;
//   } catch (e: any) {
//     return rejectWithValue(e.message);
//   }
// });

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
  async ({ color, coordinates }, { rejectWithValue, dispatch, getState }) => {
    const hubId = getState().calculator.activeHub.id;

    try {
      await ZoneService.addZone(hubId, color, coordinates);

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
