import { useStore } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  $invalidLoginForm,
  $isAuth,
  loginFormSubmit,
  loginFx,
} from "../../effector/user/authorization";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import { login } from "../../store/userSlice.ts";
import { useForm } from "react-hook-form";
import "./loginFields.scss";

const LoginFields = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const isAuth = useAppSelector((state) => state.user.isAuth);
  const isUserAuth = useStore($isAuth);
  const invalidLoginFormData = useStore($invalidLoginForm);
  const status = useAppSelector((state) => state.user.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuth) navigate("/");
  }, [isUserAuth]);

  const onSubmit = async (data) => {
    loginFormSubmit({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="wrap-of-login">
      <div className="login-fields">
        <h1 className={"login-title"}>Войдите в свой аккаунт</h1>
        <div className={"login-sub-tittle"}>
          У вас еще нет аккаунта Трансфер?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#6d9bee" }}
          >
            Создайте аккаунт
          </Link>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <input
              type={"text"}
              className={"input"}
              placeholder={"E mail"}
              {...register("email", {
                required: "Это поле обязательно",
              })}
            />
            {errors?.email && (
              <div className="error-component">{errors.email.message}</div>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type={"password"}
              className={"input"}
              placeholder={"Пароль"}
              {...register("password", {
                required: "Это поле обязательно",
              })}
            />
            {errors?.password && (
              <div className="error-component">{errors.password.message}</div>
            )}
          </div>
          <AnimatePresence>
            {/*{status === "invalid data" && (*/}
            {/*  <motion.div*/}
            {/*    initial={{ height: 0, opacity: 0 }}*/}
            {/*    animate={{ height: "auto", opacity: 1 }}*/}
            {/*    exit={{ height: 0, opacity: 0 }}*/}
            {/*    transition={{ type: "Tween" }}*/}
            {/*    style={{ overflow: "hidden" }}*/}
            {/*  >*/}
            {/*    <div className="error-component">Неверный логин или пароль</div>*/}
            {/*  </motion.div>*/}
            {/*)}*/}
            {invalidLoginFormData && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden" }}
              >
                <div className="error-component">Неверный логин или пароль</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={"login-buttons"}>
            <input type="submit" value="Войти" className="submit-button" />

            <Link to={"/reset-password"}>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  textDecoration: "underline",
                  color: "#787878",
                  cursor: "pointer",
                }}
                className={"reset-password"}
              >
                Забыли пароль?
              </div>
            </Link>
          </div>
        </form>
        <div className={"save-auth"}>
          <input type="checkbox" />
          <label>Запомнить меня?</label>
        </div>
      </div>
    </div>
  );
};

export default LoginFields;
