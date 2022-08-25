import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import calculator, { HubFormValues } from "../components/calculator/Calculator";
import CalculatorService from "../services/CalculatorService";
import {
  ICity,
  IFullHub,
  IHub,
  IHubCity,
  IHubs,
  IRegion,
} from "../types/types";

export type CalculatorState = {
  loading: boolean;
  error: boolean;
  regions: IRegion[];
  filteredRegions: IRegion[] | [];
  activeRegion: IRegion | null;
  cities: ICity[] | null;
  activeCity: ICity | null;
  filteredCities: ICity[] | [];
  hubs: IFullHub[];
  showModal: boolean;
  activeFromHub: IFullHub;
  activeToHub: IFullHub;
  hubCity: IHubCity;
  activeHub: IFullHub;
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

export const addHubThunk = createAsyncThunk<
  IFullHub,
  any,
  { rejectValue: string; state: { calculator: CalculatorState } }
>(
  "calculator/addHubThunk",
  async (
    { title, description, coordinates },
    { getState, rejectWithValue }
  ) => {
    const region = getState().calculator.activeRegion?.name;
    const city = getState().calculator.activeCity?.name;

    const coords = coordinates.split(",");
    console.log("coords", coords);

    try {
      const res = await CalculatorService.addHub({
        title,
        description,
        coordinates: coords,
        region,
        city,
      });

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
>("calculator/getHubsThunk", async ({ region, city }, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<IHubs> = await CalculatorService.getHubs(
      region,
      city
    );

    return res.data;
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
      .addCase(getHubsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHubsThunk.fulfilled, (state, action) => {
        state.hubs = action.payload.hubs;
        state.hubCity = action.payload.city;
        state.loading = false;
        state.error = false;
      })
      .addCase(addHubThunk.pending, (state) => {
        state.loading = false;
      })
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
} = calculatorSlice.actions;

export default calculatorSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
