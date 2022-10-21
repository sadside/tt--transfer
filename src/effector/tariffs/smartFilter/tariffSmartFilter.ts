import { createEvent, createStore, sample } from "effector";

const urlParams = new URLSearchParams(window.location.search);

const type = urlParams.get("type");
const active = urlParams.get("isActive");

let activeTypeStoreInitialValue = "";

switch (active) {
  case "true":
    activeTypeStoreInitialValue = "Активный";
    break;
  case "false":
    activeTypeStoreInitialValue = "Неактивный";
    break;
  default:
    activeTypeStoreInitialValue = "Все";
}

const $tariffType = createStore<string>(type || "Все");

const selectChanged = createEvent<string>();
const commissionInputChanged = createEvent<string>();

const activeSelectChanged = createEvent<string>();

const $tariffCommission = createStore<string>("");

const $tariffActive = createStore(activeTypeStoreInitialValue);

sample({
  clock: activeSelectChanged,
  target: $tariffActive,
});

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
  activeSelectChanged,
  $tariffActive,
};
