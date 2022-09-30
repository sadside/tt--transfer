import { createEffect, createEvent, createStore, forward } from "effector";
import { createGate } from "effector-react";
import UserServices from "../../services/UserServices";
import { IChangePassword, IChangeUserData } from "../../types/types";
import { $user } from "./authorization";

export const passwordPageMounted = createGate();

export const changePasswordFx = createEffect<IChangePassword, void, Error>(
  async ({ oldPassword, newPassword }) => {
    try {
      await UserServices.changePassword(oldPassword, newPassword);
    } catch (e: any) {
      if (e.response.status === 400) {
        throw new Error("invalid password");
      } else {
        throw new Error("some error");
      }
    }
  }
);

export const $invalidPassword = createStore(false)
  .on(changePasswordFx.failData, (_, error) => {
    if (error.message === "invalid password") return true;
  })
  .reset(changePasswordFx.doneData);

export const $passwordChanged = createStore(false)
  .on(changePasswordFx.doneData, () => true)
  .reset(passwordPageMounted.close);

export const changeUserDataFx = createEffect<
  IChangeUserData,
  IChangeUserData,
  Error
>(async (data) => {
  try {
    await UserServices.changeUserData(data);

    return data;
  } catch (e: any) {
    throw new Error("some error");
  }
});

export const setAvatarFx = createEffect<FormData, string, Error>(
  async (avatar) => {
    try {
      const response = await UserServices.postAvatar(avatar);

      return response.data.avatar;
    } catch (e) {
      throw new Error("some error");
    }
  }
);

export const setDocumentsFx = createEffect<FormData, string[], Error>(
  async (documents) => {
    try {
      const response = await UserServices.postDocuments(documents);

      return response.data.documents;
    } catch (e: any) {
      throw new Error("some error");
    }
  }
);

export const documentsUploaded = createEvent<FormData>();
export const userDataFormSubmitted = createEvent<IChangeUserData>();
export const changePasswordFormSubmitted = createEvent<IChangePassword>();
export const avatarUploaded = createEvent<FormData>();

forward({
  from: documentsUploaded,
  to: setDocumentsFx,
});

forward({
  from: changePasswordFormSubmitted,
  to: changePasswordFx,
});

forward({
  from: userDataFormSubmitted,
  to: changeUserDataFx,
});

forward({
  from: avatarUploaded,
  to: setAvatarFx,
});

$user
  .on(changeUserDataFx.doneData, (prevUser, user) => ({
    ...prevUser,
    ...user,
  }))
  .on(setAvatarFx.doneData, (prevUser, avatar) => ({
    ...prevUser,
    avatar,
  }))
  .on(setDocumentsFx.doneData, (prevUser, documents) => ({
    ...prevUser,
    documents,
  }));
