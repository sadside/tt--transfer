import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { reject } from "lodash";
import { TariffService } from "../services/TariffService";
import {
  CarClass,
  ICity,
  IHub,
  IHubToPrice,
  IInitialTariff,
  IRegion,
  IService,
  IShortTariff,
  IShortTariffResponse,
  ITariff,
} from "../types/types";

export type TariffState = {
  tariffRegion: string;
  tariffCity: string;
  regionSuggestions: string[];
  citySuggestions: string[];
  carClasses: CarClass[];
  status: string;
  services: IService[];
  activeTariff: ITariff | null;
  tariffName: string;
  showEditTariffSidebar: boolean;
  showAddTariffSidebar: boolean;
  showZoneSidebar: boolean;
  error: string;
  activeHub: IHubToPrice | null | undefined;
  tariffs: IShortTariffResponse | null;
  showAddCity: boolean;
  activeCityId: number | null;
  intercityRegion: string;
  intercityCity: string;
  intercityRegionSuggestions: string[];
  intercityCitySuggestions: string[];
  activeCity: any;
  tariffsPerPage: 10 | 20 | 30 | 50 | 100;
  activePage: number;
};

const initialState: TariffState = {
  tariffRegion: "",
  tariffCity: "",
  regionSuggestions: [],
  citySuggestions: [],
  carClasses: [],
  status: "idle",
  services: [],
  activeTariff: null,
  tariffName: "",
  showEditTariffSidebar: false,
  showAddTariffSidebar: false,
  showZoneSidebar: false,
  error: "",
  activeHub: null,
  tariffs: null,
  showAddCity: false,
  activeCityId: null,
  intercityRegion: "",
  intercityCity: "",
  intercityRegionSuggestions: [],
  intercityCitySuggestions: [],
  activeCity: null,
  tariffsPerPage: 10,
  activePage: 1,
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

export const editTariffPriceThunk = createAsyncThunk<
  ITariff,
  any,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/editTariffPriceThunk",
  async (tariff, { rejectWithValue, getState }) => {
    const id = getState().tariff.activeTariff?.id;

    try {
      const response = await TariffService.editTariffPrice(tariff, id);
      console.log(response);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

export const createIntercityCityThunk = createAsyncThunk<
  any,
  any,
  {
    state: {
      tariff: TariffState;
    };
    rejectValue: string;
  }
>(
  "tariff/createIntercityCity",
  async ({ region, city }, { getState, rejectWithValue }) => {
    const id = getState().tariff.activeTariff?.id;

    try {
      const response = await TariffService.createCity(id, region, city);

      return response.data;
    } catch (e: any) {
      if (e.response.status === 400)
        alert("Такой город уже имеется в данном тарифе");
      return rejectWithValue(e.message());
    }
  }
);

export const getIntercityCitySuggestions = createAsyncThunk<
  string[],
  string,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/getIntercityCitySuggestions",
  async (string, { getState, rejectWithValue }) => {
    const region = getState().tariff.intercityRegion;
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

export const getIntercityRegionSuggestions = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>(
  "tariff/getIntercityRegionSuggestions",
  async (string: string, { rejectWithValue }) => {
    try {
      const { data } = await TariffService.getRegionSuggestions(string);

      return data;
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

export const deleteTariffThunk = createAsyncThunk<
  IShortTariff[] | void,
  undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>("tariff/deleteTariffThunk", async (_, { getState, rejectWithValue }) => {
  const id = getState().tariff.activeTariff?.id;
  try {
    if (id) {
      const response = await TariffService.deleteTariff(id);

      // @ts-ignore
      // dispatch(getShortTariffs());

      return response.data;
    }
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const getTariffByIdThunk = createAsyncThunk<
  ITariff,
  number,
  { rejectValue: string }
>("tariff/getTariffByIdThink", async (id, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setShowEditTariffSidebar(true));
    const { data } = await TariffService.getTariffById(id);

    return data;
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const createTariffThunk = createAsyncThunk<
  ITariff,
  IInitialTariff,
  { rejectValue: string }
>("tariff/createTariffThunk", async (tariff, { rejectWithValue, dispatch }) => {
  try {
    dispatch(getCarClassesThunk());
    const response = await TariffService.createTariff(tariff);

    return response.data;
  } catch (e: any) {
    if (e.response.status === 400) alert("Тариф с таким именем уже создан");
    return rejectWithValue(e.message());
  }
});

export const getShortTariffs = createAsyncThunk<
  IShortTariffResponse,
  undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>("tariff/getShortTariffs", async (_, { rejectWithValue, getState }) => {
  try {
    const limit = getState().tariff.tariffsPerPage;
    const page = getState().tariff.activePage;
    const response = await TariffService.getShortTariffs(limit, page);

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
    setIntercityRegion(state, action) {
      state.intercityRegion = action.payload;
    },
    setIntercityCity(state, action) {
      state.intercityCity = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    clearTariff(state) {
      state.activeTariff = null;
      state.tariffCity = "";
      state.tariffName = "";
      state.tariffRegion = "";
      state.citySuggestions = [];
      state.regionSuggestions = [];
    },
    setTariffAlreadyCreated(state) {
      state.error = "Tariff already created";
    },
    setTariffName(state, action) {
      state.tariffName = action.payload;
    },
    setShowEditTariffSidebar(state, action: PayloadAction<boolean>) {
      state.showEditTariffSidebar = action.payload;
    },
    setShowAddTariffSidebar(state, action: PayloadAction<boolean>) {
      state.showAddTariffSidebar = action.payload;
    },
    setShowZoneSidebar(state, action) {
      if (action.payload.value) {
        state.showZoneSidebar = action.payload.value;
        state.activeHub =
          state?.activeTariff?.intracity_tariff?.hub_to_prices[
            action.payload.index
          ];
      } else {
        state.showZoneSidebar = action.payload.value;
        state.activeHub = null;
      }
    },
    setShowAddCity(state, action) {
      if (action.payload.value) {
        state.showAddCity = action.payload.value;
        if (action.payload.id) state.activeCityId = action.payload.id;
      } else {
        state.showAddCity = action.payload.value;
        state.activeCityId = null;
      }
    },
    setActiveCity(state, action) {
      state.activeCity = action.payload;
    },
    setTariffsPerPage(state, action) {
      state.tariffsPerPage = action.payload;
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

        state.activeTariff = action.payload;
        state.tariffRegion = action.payload.city.region;
        state.tariffCity = action.payload.city.city;
        state.tariffName = action.payload.title;
      })
      .addCase(createTariffThunk.pending, (state) => {
        state.status = "tariff creating";
      })
      .addCase(createTariffThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.activeTariff = action.payload;
      })
      .addCase(editTariffPriceThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.activeTariff = action.payload;
      })
      .addCase(getShortTariffs.pending, (state) => {
        state.status = "tariffs loading";
      })
      .addCase(getShortTariffs.fulfilled, (state, action) => {
        state.status = "idle";
        state.tariffs = action.payload;
      })
      .addCase(getIntercityRegionSuggestions.fulfilled, (state, action) => {
        state.intercityRegionSuggestions = action.payload;
      })
      .addCase(getIntercityCitySuggestions.fulfilled, (state, action) => {
        state.intercityCitySuggestions = action.payload;
      })
      .addCase(createIntercityCityThunk.pending, (state) => {
        state.status = "creating city";
      })
      .addCase(createIntercityCityThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.activeTariff = action.payload;
      })
      .addCase(deleteTariffThunk.fulfilled, (state, action) => {
        state.activeTariff = null;
        state.showEditTariffSidebar = false;
        state.showZoneSidebar = false;
        if (action.payload) {
          // @ts-ignore
          state.tariffs.results = action.payload;
        }
      })
      .addMatcher(isError, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const {
  setTariffCity,
  setTariffRegion,
  setTariffName,
  setShowEditTariffSidebar,
  setShowAddTariffSidebar,
  clearTariff,
  setShowZoneSidebar,
  setShowAddCity,
  setIntercityRegion,
  setIntercityCity,
  setActiveCity,
  setTariffAlreadyCreated,
  setTariffsPerPage,
  setActivePage,
} = tariffSlice.actions;

export default tariffSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
