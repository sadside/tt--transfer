import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import calculator from "../components/calculator/Calculator";
import CalculatorService from "../services/CalculatorService";
import { TariffService } from "../services/TariffService";
import { ZoneService } from "../services/ZoneService";
import {
  IAdditionalRace,
  IAddress,
  IBrokenAddress,
  ICity,
  ICityZone,
  IFullHub,
  IHubCity,
  IHubs,
  IRegion,
} from "../types/types";

export type CalculatorState = {
  cityZone: {
    coordinates: [];
  };
  loading: boolean;
  error: boolean;
  regions: IRegion[];
  filteredRegions: IRegion[] | [];
  activeRegion: "";
  cities: ICity[] | null;
  activeCity: "";
  filteredCities: ICity[] | [];
  hubs: IFullHub[];
  showModal: boolean;
  activeFromHub: IFullHub;
  activeToHub: IFullHub;
  hubCity: IHubCity;
  activeHub: IFullHub;
  activeAddressFrom: IAddress;
  activeAddressTo: IAddress;
  addressFromType: string;
  addressToType: string;
  additionalRaces: IAdditionalRace[];
  regionSuggestions: string[];
  citySuggestions: string[];
};

const initialState: CalculatorState = {
  cityZone: {
    coordinates: [],
  },
  loading: true,
  error: false,
  regions: [],
  activeRegion: "",
  filteredRegions: [],
  cities: [],
  activeCity: "",
  filteredCities: [],
  hubs: [],
  showModal: false,
  activeFromHub: {
    city: {
      center: { id: null, latitude: null, longitude: null },
      city: "",
      country: "",
      id: null,
      region: "",
    },
    coordinate: {
      id: null,
      latitude: null,
      longitude: null,
    },
    description: "",
    id: null,
    title: "",
  },
  activeToHub: {
    city: {
      center: { id: null, latitude: null, longitude: null },
      city: "",
      country: "",
      id: null,
      region: "",
    },
    coordinate: {
      id: null,
      latitude: null,
      longitude: null,
    },
    description: "",
    id: null,
    title: "",
  },
  hubCity: {
    country: "",
    region: "",
    city: "",
    id: null,
    center: {
      id: null,
      latitude: null,
      longitude: null,
    },
  },
  activeHub: {
    city: {
      center: { id: null, latitude: null, longitude: null },
      city: "",
      country: "",
      id: null,
      region: "",
    },
    coordinate: {
      id: null,
      latitude: null,
      longitude: null,
    },
    description: "",
    id: null,
    title: "",
  },
  activeAddressFrom: {
    address: "",
    coordinates: {
      lat: null,
      lon: null,
    },
  },
  activeAddressTo: {
    address: "",
    coordinates: {
      lat: null,
      lon: null,
    },
  },
  addressFromType: "",
  addressToType: "",
  additionalRaces: [],
  regionSuggestions: [],
  citySuggestions: [],
};

export const addBrokenAddress = createAsyncThunk<void, IBrokenAddress>(
  "calculator/addBrokenAddress",
  async ({ address, coordinates }, { rejectWithValue }) => {
    try {
    } catch (e) {}
  }
);

export const getRegionSuggestionsThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("tariff/getRegionSuggestion", async (string: string, { rejectWithValue }) => {
  try {
    const { data } = await TariffService.getRegionSuggestions(string);

    return data;
  } catch (e: any) {
    rejectWithValue(e.message());
  }
});

export const getCitySuggestionsThunk = createAsyncThunk<
  string[],
  string,
  { rejectValue: string; state: { calculator: CalculatorState } }
>("tariff/getCitySuggestion", async (string, { getState, rejectWithValue }) => {
  const region = getState().calculator.activeRegion;
  try {
    if (region) {
      const { data } = await TariffService.getCitySuggestions(region, string);

      return data;
    }
  } catch (e: any) {
    rejectWithValue(e.message());
  }
});

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

export const createCityZoneThunk = createAsyncThunk<
  ICityZone,
  {
    city: string;
    region: string;
    coordinates: [];
  }
>("calculator/createCityZoneThunk", async (zone) => {
  try {
    const response = await CalculatorService.createZone(zone);

    return response.data;
  } catch (e: any) {
    alert(e.response.detail);
  }
});

export const addHubThunk = createAsyncThunk<
  IFullHub,
  any,
  { rejectValue: string; state: { calculator: CalculatorState } }
>(
  "calculator/addHubThunk",
  async (
    { title, description, coordinates },
    { getState, rejectWithValue, dispatch }
  ) => {
    const region = getState().calculator.activeRegion;
    const city = getState().calculator.activeCity;

    const coords = coordinates.split(",");

    try {
      const res = await CalculatorService.addHub({
        title,
        description,
        coordinates: coords,
        region,
        city,
      });

      dispatch(setShowModal(false));

      return res.data;
    } catch (e: any) {
      console.log("hub error", e.message());

      return rejectWithValue(e.message());
    }
  }
);

export const getHubsThunk = createAsyncThunk<
  IHubs,
  any,
  { rejectValue: string }
>(
  "calculator/getHubsThunk",
  async ({ region, city }, { rejectWithValue, getState }) => {
    try {
      await ZoneService.createCity({
        region: region,
        city: city,
      });

      const res: AxiosResponse<IHubs> = await CalculatorService.getHubs(
        region,
        city
      );

      return res.data;
    } catch (e) {
      return rejectWithValue("Error");
    }
  }
);

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setActiveRegion(state, action: PayloadAction<any>) {
      state.activeRegion = action.payload;
      state.citySuggestions = [];
    },
    setActiveHub(state, action) {
      state.activeHub = action.payload;
    },
    setActiveFromHub(state, action: PayloadAction<IFullHub>) {
      state.activeFromHub = action.payload;
    },
    setActiveToHub(state, action: PayloadAction<IFullHub>) {
      state.activeToHub = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
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
    setTariffRegion(state, action) {
      state.activeRegion = action.payload;
    },
    setTariffCity(state, action) {
      state.activeCity = action.payload;
    },
    setActiveAddressFrom(state, action: PayloadAction<IAddress>) {
      state.activeAddressFrom = action.payload;
    },
    setActiveAddressTo(state, action) {
      state.activeAddressTo = action.payload;
    },
    clearFromHub(state) {
      state.activeFromHub = {
        city: {
          center: { id: null, latitude: null, longitude: null },
          city: "",
          country: "",
          id: null,
          region: "",
        },
        coordinate: {
          id: null,
          latitude: null,
          longitude: null,
        },
        description: "",
        id: null,
        title: "",
      };
    },
    clearToHub(state) {
      state.activeToHub = {
        city: {
          center: { id: null, latitude: null, longitude: null },
          city: "",
          country: "",
          id: null,
          region: "",
        },
        coordinate: {
          id: null,
          latitude: null,
          longitude: null,
        },
        description: "",
        id: null,
        title: "",
      };
    },
    setActiveCity(state, action) {
      state.activeCity = action.payload;
      state.activeHub = {
        city: {
          center: { id: null, latitude: null, longitude: null },
          city: "",
          country: "",
          id: null,
          region: "",
        },
        coordinate: {
          id: null,
          latitude: null,
          longitude: null,
        },
        description: "",
        id: null,
        title: "",
      };
    },
    setAddressFromType(state, action) {
      state.addressFromType = action.payload;
    },
    setAddressToType(state, action) {
      state.addressToType = action.payload;
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
    addAdditionalRace(state, action: PayloadAction<IAdditionalRace>) {
      state.additionalRaces.push(action.payload);
    },
    removeAdditionalRace(state, action: PayloadAction<string>) {
      state.additionalRaces = state.additionalRaces.filter(
        (race) => race.id !== action.payload
      );
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
      .addCase(getHubsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHubsThunk.fulfilled, (state, action) => {
        state.hubs = action.payload.hubs;
        state.cityZone = action.payload.zone;
        state.hubCity = action.payload.city;
        state.loading = false;
        state.error = false;
      })
      .addCase(addHubThunk.pending, (state) => {
        state.loading = false;
      })
      .addCase(createCityZoneThunk.fulfilled, (state, action) => {
        state.cityZone = action.payload;
      })
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
      .addCase(addHubThunk.fulfilled, (state, action) => {
        state.hubs.push(action.payload);
        state.showModal = false;
      })
      .addMatcher(isError, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const {
  filterRegion,
  setActiveRegion,
  filterCity,
  setActiveCity,
  setShowModal,
  setActiveFromHub,
  setActiveToHub,
  clearFromHub,
  clearToHub,
  setActiveHub,
  setAddressFromType,
  setAddressToType,
  setActiveAddressTo,
  setActiveAddressFrom,
  addAdditionalRace,
  removeAdditionalRace,
  setTariffRegion,
  setTariffCity,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
