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
  const showCodeField = useSelector((state) => state.user.showCodeField);
  const statusLoadingEmail = useSelector((state) => state.user.statusEmail);
  const statusLoadingCode = useSelector((state) => state.user.statusCode);
  const statusLoadingPassword = useSelector(
    (state) => state.user.statusPassword
  );
  const showPasswordField = useSelector(
    (state) => state.user.showPasswordField
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const emailError = useSelector((state) => state.user.emailError);
  const codeError = useSelector((state) => state.user.codeError);
  const passwordError = useSelector((state) => state.user.passwordError);

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
                dispatch(resetPassword(email));
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
                  (statusLoadingEmail === "resolved" && !emailError) ||
                  (statusLoadingEmail === "loading" && !emailError)
                }
              />
              <div
                onClick={() => {
                  if (email.length !== 0) {
                    dispatch(resetPassword(email));
                  } else {
                    alert("заполните поле");
                  }
                }}
              >
                {statusLoadingEmail === "loading" && !emailError && (
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

                {statusLoadingEmail === "resolved" && !emailError && (
                  <img src={tick} alt="" width={30} height={30} />
                )}
                {(!statusLoadingEmail || emailError) && (
                  <img src={arrowRight} alt="" />
                )}
              </div>
            </div>
          </form>
          <AnimatePresence>
            {emailError && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
              >
                <div className="reset-error">{emailError}</div>
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
                      dispatch(sendCode({ email, code }));
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
                        (statusLoadingCode === "resolved" && !codeError) ||
                        (statusLoadingCode === "loading" && !codeError)
                      }
                    />
                    <div
                      onClick={() => {
                        if (code.length !== 0) {
                          dispatch(sendCode({ email, code }));
                        } else {
                          alert("заполните поле");
                        }
                      }}
                    >
                      {statusLoadingCode === "loading" && (
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

                      {statusLoadingCode === "resolved" && !codeError && (
                        <img src={tick} alt="" width={30} height={30} />
                      )}
                      {(!statusLoadingCode || codeError) && (
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
                <div className="reset-error">{codeError}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showPasswordField && (
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
                      dispatch(sendPassword({ email, code, password }));
                    } else {
                      dispatch(
                        setPasswordError("Пароль не соответствует валидации")
                      );
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
                        (statusLoadingPassword === "resolved" &&
                          !passwordError) ||
                        (statusLoadingPassword === "loading" && !passwordError)
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
                      {statusLoadingPassword === "loading" && !password && (
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

                      {statusLoadingPassword === "resolved" && !password && (
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
