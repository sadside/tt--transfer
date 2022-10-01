import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { smartFilter } from "../address/smartFilterAddress";

const urlParams = new URLSearchParams(window.location.search);

const type = urlParams.get("type");

const $tariffType = createStore<string>(type || "Все");

const selectChanged = createEvent<string>();
const commissionInputChanged = createEvent<string>();

const $tariffCommission = createStore<string>("");

sample({
  clock: selectChanged,
  target: $tariffType,
});

sample({
  clock: commissionInputChanged,
  filter: (value) => Number(value) >= 0 && Number(value) <= 100,
  target: $tariffCommission,
});

export {
  selectChanged,
  $tariffType,
  commissionInputChanged,
  $tariffCommission,
};
