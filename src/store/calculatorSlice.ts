import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import CalculatorService from "../services/CalculatorService";
import { ICity, IRegion } from "../types/types";

type CalculatorState = {
  loading: boolean;
  error: boolean;
  regions: IRegion[];
  filteredRegions: IRegion[] | [];
  activeRegion: IRegion | null;
  cities: ICity[] | null;
  activeCity: ICity | null;
  filteredCities: ICity[] | [];
};

const initialState: CalculatorState = {
  loading: true,
  error: false,
  regions: [],
  activeRegion: null,
  filteredRegions: [],
  cities: [],
  activeCity: null,
  filteredCities: [],
};

export const getRegionsThunk = createAsyncThunk<
  IRegion[],
  undefined,
  { rejectValue: string }
>("calculator/getRegionsThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await CalculatorService.getCities();

    return res.data[0].areas;
  } catch (e) {
    return rejectWithValue("Error");
  }
});

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setActiveRegion(state, action: PayloadAction<any>) {
      if (!action.payload) {
        state.activeRegion = action.payload;
        state.cities = null;
      } else {
        state.activeRegion = action.payload;
        state.cities = action.payload.areas;
      }
    },
    filterRegion(state, action) {
      if (action.payload === "") {
        state.filteredRegions = [];
      } else {
        state.filteredRegions = state.regions.filter((item) => {
          return item.name.toLowerCase().includes(action.payload.toLowerCase());
        });
      }
    },
    setActiveCity(state, action) {
      state.activeCity = action.payload;
    },
    filterCity(state, action) {
      if (action.payload === "") {
        state.filteredCities = [];
      } else {
        if (state.cities) {
          state.filteredCities = state.cities.filter((item) => {
            return item.name
              .toLowerCase()
              .includes(action.payload.toLowerCase());
          });
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRegionsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getRegionsThunk.fulfilled, (state, action) => {
        state.regions = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getRegionsThunk.rejected, (state, action) => {
        state.error = true;
      })
      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { filterRegion, setActiveRegion, filterCity, setActiveCity } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
