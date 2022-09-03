import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TariffService } from "../services/TariffService";
import { CarClass, ICity, IRegion } from "../types/types";

type TariffState = {
  tariffRegion: IRegion | null;
  tariffCity: ICity | null;
  regionSuggestions: string[];
  citySuggestions: string[];
  carClasses: CarClass[];
  status: string;
};

const initialState: TariffState = {
  tariffRegion: null,
  tariffCity: null,
  regionSuggestions: [],
  citySuggestions: [],
  carClasses: [],
  status: "",
};

export const getRegionSuggestionsThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>(
  "tariff/getRegionSuggestions",
  async (string: string, { rejectWithValue }) => {
    try {
      const { data } = await TariffService.getRegionSuggestions(string);

      return data;
    } catch (e: any) {
      rejectWithValue(e.message());
    }
  }
);

export const getCitySuggestionsThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string; state: { tariff: TariffState } }
>("tariff/getCitySuggestions", async (string, { getState }) => {
  const city = getState().tariff.tariffCity?.name;

  try {
    if (city) {
      const { data } = await TariffService.getCitySuggestions(string, city);

      return data;
    }
  } catch (e) {}
});

export const getCarClassesThunk = createAsyncThunk<
  CarClass[],
  undefined,
  { rejectValue: string }
>("tariff/getCarClassesThunk", async (_, { rejectWithValue }) => {
  try {
    const { data } = await TariffService.getCarClasses();

    return data;
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const tariffSlice = createSlice({
  name: "tariff",
  initialState,
  reducers: {
    setTariffRegion(state, action) {
      state.tariffRegion = action.payload;
    },
    setTariffCity(state, action) {
      state.tariffCity = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(getCarClassesThunk.pending, (state) => {
      state.status = "loading";
    });
    build.addCase(
      getCarClassesThunk.fulfilled,
      (state, action: PayloadAction<CarClass[]>) => {
        state.status = "idle";
        state.carClasses = action.payload;
      }
    );
    build
      .addCase(
        getRegionSuggestionsThunk.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.regionSuggestions = action.payload;
        }
      )
      .addCase(
        getCitySuggestionsThunk.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.citySuggestions = action.payload;
        }
      );
    build.addMatcher(isError, (state) => {});
  },
});

export const { setTariffCity, setTariffRegion } = tariffSlice.actions;

export default tariffSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
