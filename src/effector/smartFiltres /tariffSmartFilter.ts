import { createEvent, createStore, sample } from "effector";

const selectChanged = createEvent<string>();
const commissionInputChanged = createEvent<string>();

const $tariffType = createStore<string>("Основной");
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
