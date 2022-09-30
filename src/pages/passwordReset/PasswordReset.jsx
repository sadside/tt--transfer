import { useStore } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../components/logo/Logo";
import "../../components/loginFields/loginFields.scss";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/arrow-right.png";
import "./passwordReset.scss";
import {
  $codeSent,
  $invalidCode,
  $invalidEmail,
  $invalidPassword,
  $passwordSent,
  $showCodeField,
  $showPasswordField,
  resetPasswordFx,
  sendCodeFx,
  sendPasswordFx,
} from "../../effector/user/resetPassword";
import {
  resetPassword,
  sendCode,
  sendPassword,
  setCodeError,
  setEmailError,
  setPasswordError,
} from "../../store/userSlice.ts";
import tick from "../../assets/tick.png";

const PasswordReset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showCodeField = useStore($showCodeField);
  const statusLoadingEmail = useStore(resetPasswordFx.pending);
  const statusLoadingCode = useStore(sendCodeFx.pending);
  const statusLoadingPassword = useStore(sendPasswordFx.pending);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const invalidEmail = useStore($invalidEmail);
  const emailSent = useStore($codeSent);
  const codeError = useStore($invalidCode);
  const codeSent = useStore($showPasswordField);
  const passwordSent = useStore($passwordSent);
  const passwordError = useStore($invalidPassword);

  return (
    <>
      <Logo />
      <div className="wrap-of-login">
        <div className="login-fields">
          <h1 className={"login-title"}>Введите свой e-mail от аккаунта</h1>
          <div className={"login-sub-tittle"}>
            На указанный адрес мы вышлем код для подтверждения восстановления
            пароля.
          </div>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (email.length !== 0) {
                resetPasswordFx(email);
              } else {
                alert("заполните поле");
              }
            }}
          >
            <div className="reset-password-input-wrap">
              <input
                type={"text"}
                className={"input"}
                placeholder={"E mail"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={
                  (emailSent && !invalidEmail) ||
                  (statusLoadingEmail && !invalidEmail)
                }
              />
              <div
                onClick={() => {
                  if (email.length !== 0) {
                    resetPasswordFx(email);
                  } else {
                    alert("заполните поле");
                  }
                }}
              >
                {statusLoadingEmail && (
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle
                      className="path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      strokeWidth="5"
                    ></circle>
                  </svg>
                )}

                {emailSent && !invalidEmail && (
                  <img src={tick} alt="" width={30} height={30} />
                )}
                {(!emailSent || invalidEmail) && !statusLoadingEmail && (
                  <img src={arrowRight} alt="" />
                )}
              </div>
            </div>
          </form>
          <AnimatePresence>
            {invalidEmail && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
              >
                <div className="reset-error">
                  Пользователя с такой почтой не существует.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showCodeField && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden", marginTop: 20 }}
              >
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (code.length !== 0) {
                      sendCodeFx({ email, code });
                    } else {
                      alert("заполните поле");
                    }
                  }}
                >
                  <div style={{ fontSize: 14 }}>
                    На ваш адрес был отправлен код для подтверждения
                    восстановления пароля.
                  </div>
                  <div className="reset-password-input-wrap">
                    <input
                      type={"text"}
                      className={"input"}
                      placeholder={"Введите код"}
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                      disabled={
                        (codeSent && !codeError) ||
                        (statusLoadingCode && !codeError)
                      }
                    />
                    <div
                      onClick={() => {
                        if (code.length !== 0) {
                          sendCodeFx({ email, code });
                        } else {
                          alert("заполните поле");
                        }
                      }}
                    >
                      {statusLoadingCode && (
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle
                            className="path"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="5"
                          ></circle>
                        </svg>
                      )}

                      {codeSent && !codeError && (
                        <img src={tick} alt="" width={30} height={30} />
                      )}
                      {!statusLoadingCode && !codeSent && (
                        <img src={arrowRight} alt="" />
                      )}
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {codeError && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
              >
                <div className="reset-error">Неверный код</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {codeSent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden", marginTop: 20 }}
              >
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (password.length !== 0 && password.length >= 8) {
                      // dispatch(sendPassword({ email, code, password }));
                      sendPasswordFx({ email, code, password });
                    } else {
                      alert("Пароль должен быть длиннее 8 символов.");
                    }
                  }}
                >
                  <div style={{ fontSize: 14 }}>Введите новый пароль.</div>
                  <div className="reset-password-input-wrap">
                    <input
                      type={"text"}
                      className={"input"}
                      placeholder={"Введите новый пароль"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      disabled={
                        (passwordSent && !passwordError) ||
                        (statusLoadingPassword && !passwordError)
                      }
                    />
                    <div
                      onClick={() => {
                        if (password.length !== 0 && password.length >= 8) {
                          dispatch(sendPassword({ email, code, password }));
                        } else {
                          dispatch(
                            setPasswordError(
                              "Пароль не соответствует валидации"
                            )
                          );
                        }
                      }}
                    >
                      {statusLoadingPassword && (
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle
                            className="path"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="5"
                          ></circle>
                        </svg>
                      )}

                      {passwordSent && !password && (
                        <img src={tick} alt="" width={30} height={30} />
                      )}
                      {(!statusLoadingPassword || passwordError) && (
                        <img src={arrowRight} alt="" />
                      )}
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {passwordError && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
              >
                <div className="reset-error">{passwordError}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/*<Button*/}
            {/*  text={"ОТПРАВИТЬ"}*/}
            {/*  callback={() => navigate("/password-sent")}*/}
            {/*  style={{ fontWeight: 300, marginTop: 30, width: 220, height: 40 }}*/}
            {/*/>*/}
            <div
              style={{
                fontWeight: 300,
                fontSize: 14,
                textDecoration: "underline",
                color: "#787878",
                cursor: "pointer",
                marginTop: 25,
              }}
              className={"reset-password"}
              onClick={() => navigate("/login")}
            >
              Страница входа
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
