import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { notification } from "antd";
import {
  addCitySidebarChanged,
  addGlobalAddressSidebarChanged,
  addHubSidebarChanged,
} from "../effector/tariffs/editTariff/editIntercityRoute/editIntercityRoute";
import $api from "../http";
import { TariffService } from "../services/TariffService";
import {
  CarClass,
  IGlobalAddress,
  IHubToPrice,
  IInitialGlobalAddress,
  IInitialTariff,
  IIntercityHub,
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
  checkedState: boolean[];
  isSelectAll: boolean;
  globalAddressSuggestions: string[];
  globalAddressInputValue: string;
  activeGlobalAddress: string;
  activeGlobalAddressRoute: IGlobalAddress | null;
  activeHubRoute: IIntercityHub | null;
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
  checkedState: [],
  isSelectAll: false,
  globalAddressSuggestions: [],
  globalAddressInputValue: "",
  activeGlobalAddress: "",
  activeGlobalAddressRoute: null,
  activeHubRoute: null,
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

      await $api.get(`tariffs/set-last-update/${id}/`);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

export const editTariff = createAsyncThunk<
  ITariff,
  any,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/editTariff",
  async (tariff, { rejectWithValue, getState, dispatch }) => {
    const id = getState().tariff.activeTariff?.id;

    if (id) {
      try {
        const response = await TariffService.postTariff(tariff, id);

        await $api.get(`tariffs/set-last-update/${id}/`);

        dispatch(getShortTariffs());

        return response.data;
      } catch (e: any) {
        return rejectWithValue("error");
      }
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
  async (
    { region, city, converse },
    { getState, rejectWithValue, dispatch }
  ) => {
    const id = getState().tariff.activeTariff?.id;

    try {
      const response = await TariffService.createCity(
        id,
        region,
        city,
        converse
      );

      dispatch(setShowAddCity({ value: false }));

      return response.data;
    } catch (e: any) {
      alert(e.response.data.detail);
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
>(
  "tariff/deleteTariffThunk",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const id = getState().tariff.activeTariff?.id;
    try {
      if (id) {
        await TariffService.deleteTariff(id);

        dispatch(getShortTariffs());
      }
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

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

    // @ts-ignore
    dispatch(getShortTariffs());
    return response.data;
  } catch (e: any) {
    alert(e.response.data.detail);
    return rejectWithValue(e.message());
  }
});

export const getGlobalAddressesSuggestion = createAsyncThunk<
  string[],
  undefined,
  { state: { tariff: TariffState } }
>("tariff/getGlobalAddressesSuggestion", async (_, { getState }) => {
  const address = getState().tariff.globalAddressInputValue;

  try {
    const { data } = await TariffService.getGlobalAddressesSuggestions(address);

    return data;
  } catch (e: any) {
    alert(e.response.data);
  }
});

export const removeIntercityCity = createAsyncThunk<
  any | undefined,
  undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>("tariff/removeIntercityCity", async (_, { rejectWithValue, getState }) => {
  try {
    const tariffId = getState().tariff.activeTariff?.id;
    const intercityId = getState().tariff.activeCity.id;

    if (tariffId) {
      const response = await TariffService.deleteIntercityRoad(
        tariffId,
        intercityId
      );

      return response.data;
    }
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const removeGlobalAddressRoute = createAsyncThunk<
  any | undefined,
  undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/removeGlobalAddressRoute",
  async (_, { rejectWithValue, getState }) => {
    try {
      const tariffId = getState().tariff.activeTariff?.id;
      const intercityId = getState().tariff.activeGlobalAddressRoute?.id;

      if (tariffId && intercityId) {
        const response = await TariffService.deleteGlobalAddressRoute(
          tariffId,
          intercityId
        );

        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

export const removeHubRoute = createAsyncThunk<
  any | undefined,
  undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>("tariff/removeHubRoute", async (_, { rejectWithValue, getState }) => {
  try {
    const tariffId = getState().tariff.activeTariff?.id;
    const intercityId = getState().tariff.activeHubRoute?.id;

    if (tariffId && intercityId) {
      const response = await TariffService.deleteHubRoute(
        tariffId,
        intercityId
      );

      return response.data;
    }
  } catch (e: any) {
    return rejectWithValue(e.message());
  }
});

export const createRouteWithGlobalAddress = createAsyncThunk<
  any,
  string,
  {
    state: {
      tariff: TariffState;
    };
  }
>(
  "tariff/createRouteWithGlobalAddress",
  async (data, { getState, rejectWithValue }) => {
    const id = getState().tariff.activeTariff?.id;

    try {
      if (id) {
        const response = await TariffService.createRouteWithGlobalAddress(
          data,
          id
        );

        return response.data;
      }
    } catch (e: any) {
      alert(e.response.data.detail);
      return rejectWithValue("error");
    }
  }
);

export const createGlobalAddressThunk = createAsyncThunk<
  void,
  IInitialGlobalAddress
>("tariff/createGlobalAddress", async (globalAddress) => {
  // try {
  //   await TariffService.addGlobalAddress(globalAddress);
  // } catch (e: any) {
  //   alert(e.response.data);
  // }

  const response = await TariffService.addGlobalAddress(globalAddress);

  alert(response.data.detail);
});

export const createRouteWithHubThunk = createAsyncThunk<
  any,
  string,
  { state: { tariff: TariffState } }
>(
  "tariff/createRouteWithHubThunk",
  async (hub, { getState, rejectWithValue }) => {
    const id = getState().tariff.activeTariff?.id;

    try {
      if (id) {
        const response = await TariffService.createRouteWithHub(hub, id);

        return response.data;
      }
    } catch (e: any) {
      alert(e.response.data.detail);
      return rejectWithValue("already created");
    }
  }
);

export const getShortTariffs = createAsyncThunk<
  IShortTariffResponse,
  boolean | undefined,
  { rejectValue: string; state: { tariff: TariffState } }
>(
  "tariff/getShortTariffs",
  async (isFilter, { rejectWithValue, getState, dispatch }) => {
    const urlParams = new URLSearchParams(window.location.search);

    if (isFilter) dispatch(setActivePage(1));

    try {
      const limit = getState().tariff.tariffsPerPage;
      let page = getState().tariff.activePage;
      const region = urlParams.get("region") || "";
      const city = urlParams.get("city") || "";
      const type = urlParams.get("type") || "";
      const isActive = urlParams.get("isActive") || "";

      // if (region || city || type || isActive) page = 1;

      const response = await TariffService.getShortTariffs(
        limit,
        page,
        region,
        city,
        type,
        isActive
      );

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message());
    }
  }
);

// export const;

export const tariffSlice = createSlice({
  name: "tariff",
  initialState,
  reducers: {
    setTariffRegion(state, action) {
      state.tariffRegion = action.payload;
    },
    setIsSelectAll(state, action) {
      state.isSelectAll = action.payload;
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
    setGlobalAddressInputValue(state, action) {
      state.globalAddressInputValue = action.payload;
    },
    setActiveGlobalAddress(state, action) {
      state.activeGlobalAddress = action.payload;
    },
    removeActiveGlobalAddress(state, acton) {
      state.activeGlobalAddress = "";
    },
    updateCheckedState(state, action: PayloadAction<number>) {
      if (state.checkedState)
        state.checkedState = state.checkedState.map((item, index) =>
          index === action.payload ? !item : item
        );

      let countTrueItems = 0;

      // state.checkedState.includes(true)
      //   ? handleShowActionMenu(true)
      //   : handleShowActionMenu(false);

      state.checkedState.forEach((item) => {
        if (item) countTrueItems += 1;
      });

      if (state.checkedState.includes(false)) state.isSelectAll = false;

      // countTrueItems === 1
      //   ? setOnlyOneSelected(true)
      //   : setOnlyOneSelected(false);
      // checkedState.includes(false) && setIsSelectAll(false);
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
    setCheckedState(state, action) {
      state.checkedState = new Array(state.checkedState.length).fill(
        action.payload
      );
    },
    setActiveCity(state, action) {
      state.activeCity = action.payload;
    },
    setActiveGlobalAddressRoute(state, action) {
      state.activeGlobalAddressRoute = action.payload;
    },
    setActiveHubRoute(state, action) {
      state.activeHubRoute = action.payload;
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
      // .addCase(createGlobalAddressThunk.fulfilled, () => {
      //   alert("Глобальный адрес создан");
      // })
      .addCase(createRouteWithHubThunk.pending, (state) => {
        state.status = "creating city";
      })
      .addCase(createRouteWithHubThunk.fulfilled, (state, action) => {
        state.status = "idle";
        state.showAddCity = false;
        state.activeTariff = action.payload;
        addHubSidebarChanged(false);
      })
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
        // state.isSelectAll = false;
        state.tariffs = action.payload;
        state.checkedState = new Array(action.payload.results.length).fill(
          state.isSelectAll
        );
        notification["success"]({
          message: "Notification Title",
          description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        });
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
        addCitySidebarChanged(false); //effector's event
      })
      .addCase(deleteTariffThunk.fulfilled, (state, action) => {
        state.activeTariff = null;
        state.showEditTariffSidebar = false;
        state.showZoneSidebar = false;
        // if (action.payload) {
        //   // @ts-ignore
        //   state.tariffs.results = action.payload;
        // }
      })
      .addCase(editTariff.fulfilled, (state, action) => {
        state.activeTariff = action.payload;
      })
      .addCase(getGlobalAddressesSuggestion.fulfilled, (state, action) => {
        state.globalAddressSuggestions = action.payload;
      })
      .addCase(removeIntercityCity.fulfilled, (state, action) => {
        if (action.payload && state.activeTariff)
          state.activeTariff.intercity_tariff = action.payload;

        state.activeCity = null;
      })
      .addCase(removeGlobalAddressRoute.fulfilled, (state, action) => {
        if (action.payload && state.activeTariff)
          state.activeTariff.intercity_tariff = action.payload;

        state.activeGlobalAddressRoute = null;
      })
      .addCase(removeHubRoute.fulfilled, (state, action) => {
        if (action.payload && state.activeTariff)
          state.activeTariff.intercity_tariff = action.payload;

        state.activeHubRoute = null;
      })
      .addCase(createRouteWithGlobalAddress.pending, (state) => {
        state.status = "creating city";
      })
      .addCase(createRouteWithGlobalAddress.fulfilled, (state, action) => {
        if (state.activeTariff) {
          state.status = "idle";
          state.activeTariff = action.payload;
          state.showAddCity = false;
          addGlobalAddressSidebarChanged(false);
        }
      })
      .addCase(createRouteWithGlobalAddress.rejected, (state) => {
        state.activeGlobalAddress = "";
        state.globalAddressInputValue = "";
      })
      .addMatcher(isError, (state, action) => {
        state.status = "idle";
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
  updateCheckedState,
  setCheckedState,
  setIsSelectAll,
  setGlobalAddressInputValue,
  setActiveGlobalAddress,
  removeActiveGlobalAddress,
  setActiveGlobalAddressRoute,
  setActiveHubRoute,
} = tariffSlice.actions;

export default tariffSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
