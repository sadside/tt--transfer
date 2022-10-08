import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { TariffService } from "../../../services/TariffService";

const smartFilter = createGate();

const urlParams = new URLSearchParams(window.location.search);

const region = urlParams.get("region");
const city = urlParams.get("city");

const regionInputChanged = createEvent<string>();
const cityInputChanged = createEvent<string>();

const regionSuggestionClicked = createEvent<string>();
const citySuggestionClicked = createEvent<string>();

const clearSuggestions = createEvent();

const getRegionsSuggestionsFx = createEffect<{ region: string }, string[]>(
  async ({ region }) => {
    try {
      const { data } = await TariffService.getRegionSuggestions(region);

      return data;
    } catch (e: any) {
      throw new Error("some error");
    }
  }
);

const getCitiesSuggestionsFx = createEffect<
  { region: string; city: string },
  string[]
>(async ({ region, city }) => {
  try {
    if (region) {
      const { data } = await TariffService.getCitySuggestions(region, city);

      return data;
    }
  } catch (e: any) {
    throw new Error("some error");
  }
});

const $activeRegion = createStore(region || "");
const $activeCity = createStore(city || "");

const $regionInputValue = createStore(region || "").on(
  regionInputChanged,
  (_, region) => region
);

const $cityInputValue = createStore(city || "").on(
  cityInputChanged,
  (_, region) => region
);

const $regionSuggestions = createStore<string[]>([])
  .on(getRegionsSuggestionsFx.doneData, (_, region) => region)
  .reset(clearSuggestions);

const $citySuggestions = createStore<string[]>([])
  .on(getCitiesSuggestionsFx.doneData, (_, region) => region)
  .reset(clearSuggestions);

sample({
  clock: cityInputChanged,
  source: $activeRegion,
  fn: (region, city) => ({ region, city }),
  target: getCitiesSuggestionsFx,
});

sample({
  clock: regionSuggestionClicked,
  target: $activeRegion,
});

sample({
  clock: citySuggestionClicked,
  target: $activeCity,
});

sample({
  clock: regionInputChanged,
  fn: (region) => ({ region }),
  target: getRegionsSuggestionsFx,
});

sample({ clock: regionInputChanged, fn: () => "", target: $activeRegion });

sample({
  clock: regionSuggestionClicked,
  target: $regionInputValue,
});

sample({
  clock: regionSuggestionClicked,
  target: cityInputChanged.prepend(() => ""),
});

sample({ clock: cityInputChanged, fn: () => "", target: $activeCity });

sample({
  clock: citySuggestionClicked,
  target: $cityInputValue,
});

export {
  $cityInputValue,
  $activeCity,
  cityInputChanged,
  regionInputChanged,
  $citySuggestions,
  $regionSuggestions,
  $regionInputValue,
  regionSuggestionClicked,
  $activeRegion,
  citySuggestionClicked,
  smartFilter,
};
