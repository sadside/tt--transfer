import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { TariffService } from "../../services/TariffService";

const addressGate = createGate();

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

const $activeRegion = createStore("").reset(addressGate.close);
const $activeCity = createStore("").reset(addressGate.close);

const $regionInputValue = createStore("")
  .on(regionInputChanged, (_, region) => region)
  .reset(addressGate.close);

const $cityInputValue = createStore("")
  .on(cityInputChanged, (_, region) => region)
  .reset(addressGate.close);

const $regionSuggestions = createStore<string[]>([])
  .on(getRegionsSuggestionsFx.doneData, (_, region) => region)
  .reset(clearSuggestions)
  .reset(addressGate.close);

const $citySuggestions = createStore<string[]>([])
  .on(getCitiesSuggestionsFx.doneData, (_, region) => region)
  .reset(clearSuggestions)
  .reset(addressGate.close);

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
  addressGate,
  regionSuggestionClicked,
  $activeRegion,
  citySuggestionClicked,
};
