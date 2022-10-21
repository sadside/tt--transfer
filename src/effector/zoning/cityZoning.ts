import { createEffect, createEvent, createStore, sample } from "effector";
import CalculatorService from "../../services/CalculatorService";
import { ICityZone } from "../../types/types";

const $cityZone = createStore<ICityZone | null>(null);

const citySuggestionClicked = createEvent<string>();

const createZoneFx = createEffect<
  {
    city: string;
    region: string;
    coordinates: [];
  },
  ICityZone
>(async (zone) => {
  try {
    const response = await CalculatorService.createZone(zone);

    return response.data;
  } catch (e: any) {
    alert(e.response.detail);
  }
});

const addZoneButtonClicked = createEvent<{
  city: string;
  region: string;
  coordinates: [];
}>();

sample({
  clock: addZoneButtonClicked,
  target: createZoneFx,
});
