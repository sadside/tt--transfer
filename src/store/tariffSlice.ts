import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TariffService } from "../services/TariffService";
import {
  CarClass,
  ICity,
  IInitialTariff,
  IRegion,
  IService,
  ITariff,
} from "../types/types";

type TariffState = {
  tariffRegion: string;
  tariffCity: string;
  regionSuggestions: string[];
  citySuggestions: string[];
  carClasses: CarClass[];
  status: string;
  services: IService[];
  tariff: ITariff | null;
  tariffName: string;
};

const initialState: TariffState = {
  tariffRegion: "",
  tariffCity: "",
  regionSuggestions: [],
  citySuggestions: [],
  carClasses: [],
  status: "idle",
  services: [],
  tariff: null,
  tariffName: "",
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

export const editTariffPriceThunk = createAsyncThunk<
  ITariff,
  any,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/editTariffPriceThunk",
  async (tariff, { rejectWithValue, getState }) => {
    const id = getState().tariff.tariff?.id;

    try {
      const response = await TariffService.editTariffPrice(tariff, id);
      console.log(response);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

export const getCitySuggestionsThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/getCitySuggestions",
  async (string, { getState, rejectWithValue }) => {
    const region = getState().tariff.tariffRegion;
    try {
      if (region) {
        const { data } = await TariffService.getCitySuggestions(region, string);

        return data;
      }
    } catch (e: any) {
      rejectWithValue(e.message());
    }
  }
);

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

export const getTariffServicesThunk = createAsyncThunk<
  IService[],
  undefined,
  { rejectValue: string }
>("tariff/getTariffServices", async (_, { rejectWithValue }) => {
  try {
    const { data } = await TariffService.getTariffServices();

    return data;
  } catch (e: any) {
    return rejectWithValue("Ошибка при загрузке текущих услуг");
  }
});

export const getTariffByIdThunk = createAsyncThunk<
  ITariff,
  number,
  { rejectValue: string }
>("tariff/getTariffByIdThink", async (id, { rejectWithValue }) => {
  try {
    const { data } = await TariffService.getTariffById(id);

    return data;
  } catch (e: any) {
    return rejectWithValue("error");
  }
});

export const createTariffThunk = createAsyncThunk<
  ITariff,
  IInitialTariff,
  { rejectValue: string }
>("tariff/createTariffThunk", async (tariff, { rejectWithValue }) => {
  try {
    const response = await TariffService.createTariff(tariff);

    return response.data;
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
    clearTariff(state) {
      state.tariff = null;
    },
    setTariffName(state, action) {
      state.tariffName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarClassesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getCarClassesThunk.fulfilled,
        (state, action: PayloadAction<CarClass[]>) => {
          state.status = "idle";
          state.carClasses = action.payload;
        }
      )
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
      )
      .addCase(
        getTariffServicesThunk.fulfilled,
        (state, action: PayloadAction<IService[]>) => {
          state.services = action.payload;
        }
      )
      .addCase(getTariffByIdThunk.pending, (state) => {
        state.status = "tariff loading";
      })
      .addCase(getTariffByIdThunk.fulfilled, (state, action) => {
        state.status = "idle";

        state.tariff = action.payload;
      })
      .addCase(createTariffThunk.pending, (state) => {
        state.status = "tariff creating";
      })
      .addCase(createTariffThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.tariff = action.payload;
      })
      .addCase(editTariffPriceThunk.fulfilled, (state, action) => {
        state.tariff = action.payload;
      })
      .addMatcher(isError, (state, action) => {
        state.status = action.payload;
      });
  },
});

export const { setTariffCity, setTariffRegion, setTariffName } =
  tariffSlice.actions;

export default tariffSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
