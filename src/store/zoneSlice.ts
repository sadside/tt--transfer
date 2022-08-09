import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ZoneService } from "../services/ZoneService";
import { IGetZone, IZone } from "../types/types";

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
  IGetZone,
  { rejectValue: string }
>("zone/getZone", async ({ region, city }, { rejectWithValue }) => {
  try {
    const res = await ZoneService.getZones(region, city);
    console.log(res.data);
    return res.data;
  } catch (e: any) {
    rejectWithValue(e.message);
  }
});

export const editZoneThunk = createAsyncThunk<
  IZone[],
  IZone,
  { rejectValue: string }
>("zone/editZoneThunk", async (zone, { rejectWithValue }) => {
  try {
    const res = await ZoneService.editZone(zone);

    return res.data.zones;
  } catch (e: any) {
    return rejectWithValue(e.messages);
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
    deleteZone(state, action: PayloadAction<number>) {
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
        state.zones = action.payload;
      })
      .addCase(editZoneThunk.pending, (state) => {
        state.loading = true;
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
