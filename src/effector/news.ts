import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { createGate } from "effector-react";
import NewsServices from "../services/NewsServices";

export const getNewsFx = createEffect(async () => {
  const response = await NewsServices.getNews();

  return response.data;
});

export const addNewFx = createEffect(async (news: any) => {
  const response = await NewsServices.createNew(news);
});

export const $news = createStore([]).on(getNewsFx.doneData, (_, data) => data);
export const $newsNameInput = createStore("1");
export const $newsDescriptionInput = createStore("2");
export const $newsRole = createStore("3");

export const NewsPageGate = createGate();

sample({
  clock: NewsPageGate.open,
  target: getNewsFx,
});

const $form = combine($newsNameInput, $newsDescriptionInput, $newsRole);

console.log($form);
