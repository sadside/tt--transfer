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
      const response = await TariffService.createRouteWithHub(hub);

      return response.data;
    } catch (e: any) {
      throw new Error(e.message());
    }
  }
);

const hubInputChanged = createEvent<string>();
const suggestionClicked = createEvent<string>();

const $hubInputValue = createStore("");
const $activeHub = createStore("");
const $hubSuggestions = createStore<string[]>([]).reset(
  getHubSuggestionsFx.failData
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
};
