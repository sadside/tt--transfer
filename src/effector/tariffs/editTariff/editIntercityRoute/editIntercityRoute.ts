import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { TariffService } from "../../../../services/TariffService";

const getHubSuggestionsFx = createEffect<{ string: string }, string[], Error>(
  async ({ string }) => {
    try {
      const response = await TariffService.getHubsSuggestions(string);

      return response.data;
    } catch (e: any) {
      alert(e.response.data);
      throw new Error(e.message());
    }
  }
);

const createRouteWithHubFx = createEffect<{ hub: string }, any, Error>(
  async ({ hub }) => {
    try {
      const response = await TariffService.createRouteWithHub(hub, 10);

      return response.data;
    } catch (e: any) {
      throw new Error(e.message());
    }
  }
);

const addCitySidebarChanged = createEvent<boolean>();

const $showAddCitySidebar = createStore(false).on(
  addCitySidebarChanged,
  (_, state) => state
);

const addGlobalAddressSidebarChanged = createEvent<boolean>();

const $showAddGlobalSidebar = createStore(false).on(
  addGlobalAddressSidebarChanged,
  (_, state) => state
);

const addHubSidebarChanged = createEvent<boolean>();

const $showAddHubSidebar = createStore(false).on(
  addHubSidebarChanged,
  (_, state) => state
);

const hubInputChanged = createEvent<string>();
const suggestionClicked = createEvent<string>();

const $hubInputValue = createStore("");
const $activeHub = createStore("").reset(hubInputChanged);
const $hubSuggestions = createStore<string[]>([]).reset(
  getHubSuggestionsFx.failData
);

const globalAddressRouteClicked = createEvent<boolean>();
const hubClicked = createEvent<boolean>();

const $showGlobalAddressRouteInfo = createStore(false).on(
  globalAddressRouteClicked,
  (_, payload) => payload
);
const $showHubRouteInfo = createStore(false).on(
  hubClicked,
  (_, payload) => payload
);

sample({
  clock: getHubSuggestionsFx.doneData,
  target: $hubSuggestions,
});

sample({
  clock: suggestionClicked,
  target: [$hubInputValue, $activeHub],
});

forward({
  from: hubInputChanged,
  to: $hubInputValue,
});

sample({
  clock: hubInputChanged,
  source: $hubInputValue,
  fn: (source) => ({ string: source }),
  target: getHubSuggestionsFx,
});

export {
  hubInputChanged,
  $hubInputValue,
  $activeHub,
  $hubSuggestions,
  suggestionClicked,
  $showAddCitySidebar,
  $showAddGlobalSidebar,
  $showAddHubSidebar,
  addGlobalAddressSidebarChanged,
  addCitySidebarChanged,
  addHubSidebarChanged,
  globalAddressRouteClicked,
  hubClicked,
  $showGlobalAddressRouteInfo,
  $showHubRouteInfo,
};
