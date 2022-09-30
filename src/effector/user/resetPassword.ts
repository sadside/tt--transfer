import { createEffect, createStore } from "effector";
import UserServices from "../../services/UserServices";
import { ICodeCheck, ISendPassword } from "../../types/types";

export const resetPasswordFx = createEffect<string, void>(async (email) => {
  console.log(email);
  await UserServices.resetPassword(email);
});

export const sendCodeFx = createEffect<ICodeCheck, void, Error>(
  async ({ email, code }) => {
    await UserServices.sendCode({ email, code });
  }
);

export const sendPasswordFx = createEffect<ISendPassword, void>(
  async ({ email, code, password }) => {
    await UserServices.sendPassword(code, email, password);
    window.location.href = "/success";
  }
);

export const $invalidEmail = createStore(false)
  .on(resetPasswordFx.failData, () => true)
  .reset(resetPasswordFx.doneData);

export const $codeSent = createStore(false).on(
  resetPasswordFx.doneData,
  () => true
);

export const $invalidCode = createStore(false)
  .on(sendCodeFx.failData, () => true)
  .reset(sendCodeFx.doneData);

export const $showPasswordField = createStore(false).on(
  sendCodeFx.doneData,
  () => true
);

export const $showCodeField = createStore(false).on(
  resetPasswordFx.doneData,
  () => true
);

export const $passwordSent = createStore(false).on(
  sendPasswordFx.doneData,
  () => true
);

export const $invalidPassword = createStore(false)
  .on(sendPasswordFx.failData, () => true)
  .reset(sendPasswordFx.doneData);
