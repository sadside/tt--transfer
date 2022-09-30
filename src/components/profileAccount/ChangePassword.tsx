import "./profileAccount.scss";
import { useGate, useStore } from "effector-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  $invalidPassword,
  $passwordChanged,
  changePasswordFormSubmitted,
  passwordPageMounted,
} from "../../effector/user/editUserData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changePassword } from "../../store/userSlice";
import ErrorComponent from "../errorComponent/ErrorComponent";
import Button from "../ui/button/Button";
import CustomEditProfileInput from "./CustomEditProfileInput";

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>("");
  const [validateError, setValidateError] = useState<boolean>(false);

  const invalidPassword = useStore($invalidPassword);
  const passwordChanged = useStore($passwordChanged);

  useGate(passwordPageMounted);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (oldPassword !== newPassword && newPassword.length >= 8) {
      changePasswordFormSubmitted({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
      setNewPasswordRepeat("");
    } else {
      setValidateError(true);
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div className={"change-password-input"}>
          <div style={{ color: "#777777" }}>Старый пароль</div>
          <input
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            placeholder={"Введите старый пароль"}
            className={"edit-profile-input"}
            style={{ marginBottom: 15 }}
            autoComplete={"off"}
          />
          {oldPassword.length !== 0 && (
            <div
              onClick={() => setShowOldPassword(!showOldPassword)}
              className={"show-password"}
            >
              {!showOldPassword ? "Показать" : "Скрыть"}
            </div>
          )}
        </div>
        <div className={"change-password-input"}>
          <div style={{ color: "#777777" }}>Новый пароль</div>

          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            placeholder={"Введите пароль"}
            className={"edit-profile-input"}
            style={{ marginBottom: 15 }}
            autoComplete={"off"}
          />
          {newPassword.length !== 0 && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className={"show-password"}
            >
              {!showPassword ? "Показать" : "Скрыть"}
            </div>
          )}
        </div>
        <div className={"change-password-input"}>
          <div style={{ color: "#777777" }}>Повторите новый пароль</div>

          <input
            type={showNewPassword ? "text" : "password"}
            value={newPasswordRepeat}
            onChange={(e) => {
              setNewPasswordRepeat(e.target.value);
            }}
            placeholder={"Введите пароль"}
            className={"edit-profile-input"}
            style={{ marginBottom: 15 }}
            autoComplete={"off"}
          />
          {newPasswordRepeat.length !== 0 && (
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className={"show-password"}
            >
              {!showNewPassword ? "Показать" : "Скрыть"}
            </div>
          )}
        </div>
        {validateError && (
          <div className="error-component" style={{ width: 440 }}>
            Новый пароль должен состоять из 8 символов.
          </div>
        )}
        {invalidPassword && (
          <div className="error-component" style={{ width: 440 }}>
            Старый пароль неверный.
          </div>
        )}
        {passwordChanged && <div>Пароль изменен.</div>}
        <input
          type="submit"
          value="Сменить пароль"
          className={"submit-button"}
          style={{ width: 180, fontWeight: 300, marginTop: 30 }}
        />
      </form>
    </>
  );
};

export default ChangePassword;
