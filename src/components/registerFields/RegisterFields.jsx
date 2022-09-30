import "./registerFields.scss";
import { useStore } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {
  $accountAlreadyCreated,
  $isAuth,
  registrationFormSubmit,
  registrationFx,
} from "../../effector/user/authorization";
import useOutside from "../../hooks/useOutside";
import { registration, setPasswordMatch } from "../../store/userSlice.ts";
import CustomSelect from "../customSelect/CustomSelect";
import downArrowSelect from "../../assets/downArrowSelect.svg";
import ErrorComponent from "../errorComponent/ErrorComponent";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const RegisterFields = () => {
  const dispatch = useAppDispatch();
  const accountAlreadyCreated = useStore($accountAlreadyCreated);

  const isUserAuth = useStore($isAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  useEffect(() => {
    isUserAuth && navigate("/");
  }, isUserAuth);

  const isAuth = useAppSelector((state) => state.user.isAuth);
  const matchPassword = useAppSelector((state) => state.user.passwordMatch);
  const items = ["Клиент", "Менеджер"];
  const { isShow, setIsShow, ref } = useOutside(false);
  const [activeItem, setActiveItem] = useState("Клиент");

  const onSubmit = (data) => {
    if (data.firstPassword === data.secondPassword) {
      const formData = {
        email: data.email,
        surname: data.surname,
        name: data.name,
        patronymic: data.patronymic,
        phone: data.phone,
        password: data.firstPassword,
        role: activeItem === "Менеджер" ? "m" : "c",
      };

      registrationFormSubmit(formData);
      // dispatch(
      // 	registration({
      // 		email: data.email,
      // 		surname: data.surname,
      // 		name: data.name,
      // 		patronymic: data.patronymic,
      // 		phone: data.phone,
      // 		password: data.firstPassword,
      // 		role: activeItem === 'Менеджер' ? 'm' : 'c',
      // 	}),
      // )
      // dispatch(setPasswordMatch(null));
    } else {
      dispatch(setPasswordMatch(true));
    }
  };

  return (
    <div className="register-fields-wrap">
      <div className="register-fields-title">Регистрация</div>
      <div className="register-fields-description">
        Создайте аккаунт Трансфер и получите все необходимые инструменты
        эффективного управления бизнесом! У вас уже есть аккаунт Трансфер?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "#6d9bee" }}>
          Войти в аккаунт
        </Link>
      </div>
      <div className="register-fields-inputs">
        <form
          action=""
          className={"reg-form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="" ref={ref}>
            <div>
              <div
                className="role-class-select"
                onClick={() => setIsShow(!isShow)}
              >
                <div>{activeItem}</div>
                <img src={downArrowSelect} alt="" />
              </div>
            </div>
            <CustomSelect
              items={items}
              isVisible={isShow}
              setVisible={setIsShow}
              setItem={setActiveItem}
              showAll={false}
            />
          </div>
          <div className="input-wrapper">
            <input
              type={"text"}
              className={"input"}
              placeholder={"Ваша фамилия"}
              autoComplete={"off"}
              {...register("surname", {
                required: "Это поле обязательно для заполнения!",
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Введите корректную фамилию.",
                },
                minLength: {
                  value: 3,
                  message: "Минимальная длина 3 символа.",
                },
                maxLength: {
                  value: 15,
                  message: "Максимальная длина 15 символов",
                },
              })}
            />
            <AnimatePresence>
              {errors?.surname && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "Tween" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="error-component">
                    {errors.surname.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="input-wrapper">
            <input
              type={"text"}
              className={"input"}
              placeholder={"Ваше имя"}
              autoComplete={"off"}
              {...register("name", {
                required: "Это поле обязательно для заполнения!",
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Введите корректное имя.",
                },
                minLength: {
                  value: 3,
                  message: "Минимальная длина 3 символа.",
                },
                maxLength: {
                  value: 15,
                  message: "Максимальная длина 15 символов",
                },
              })}
            />
            <AnimatePresence>
              {errors?.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "Tween" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="error-component">{errors.name.message}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="input-wrapper">
            <input
              type={"text"}
              className={"input"}
              placeholder={"Ваше отчество"}
              autoComplete={"off"}
              {...register("patronymic", {
                required: "Это поле обязательно для заполнения!",
                pattern: {
                  value: /^[a-zа-яё]+$/i,
                  message: "Введите корректное отчество.",
                },
                minLength: {
                  value: 3,
                  message: "Минимальная длина 3 символа.",
                },
                maxLength: {
                  value: 15,
                  message: "Максимальная длина 15 символов",
                },
              })}
            />
            <AnimatePresence>
              {errors?.patronymic && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "Tween" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="error-component">
                    {errors.patronymic.message}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <input
            type={"email"}
            className={"input"}
            placeholder={"E mail"}
            autoComplete={"off"}
            {...register("email", {
              required: "Это поле обязательно для заполнения!",
              pattern: {
                value:
                  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: "Введите корректную почту.",
              },
            })}
          />
          <AnimatePresence>
            {errors?.email && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden" }}
              >
                <div className="error-component">{errors.email.message}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type={"text"}
            className={"input"}
            placeholder={"Телефон"}
            autoComplete={"off"}
            {...register("phone", {
              required: "Это поле обязательно для заполнения!",
              pattern: {
                value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                message: "Введите корректный номер телефона.",
              },
            })}
          />
          <AnimatePresence>
            {errors?.phone && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden" }}
              >
                <div className="error-component">{errors.phone.message}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type={"password"}
            className={"input"}
            placeholder={"Пароль"}
            autoComplete={"off"}
            {...register("firstPassword", {
              required: "Это обязательное поле",
              minLength: {
                value: 8,
                message: "Минимальная длина пароля 8 символов.",
              },
              pattern: {
                value:
                  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                message:
                  "Пароль должен содержать минимум одну цифру и символ в верхнем регистре. Минимальная длина пароля 8 символов.",
              },
            })}
          />
          <AnimatePresence>
            {errors?.firstPassword && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden" }}
              >
                <div className="error-component">
                  {errors.firstPassword.message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <input
            type={"password"}
            className={"input"}
            placeholder={"Повторите пароль"}
            autoComplete={"off"}
            {...register("secondPassword", {
              required: "Это обязательное поле",
              minLength: {
                value: 8,
                message: "Минимальная длина пароля 8 символов.",
              },
              pattern: {
                value:
                  /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                message:
                  "Пароль должен содержать минимум одну цифру и символ в верхнем регистре. Минимальная длина пароля 8 символов.",
              },
            })}
          />
          {accountAlreadyCreated && (
            <ErrorComponent
              text={"Пользователь с такой почтой уже существует."}
            />
          )}
          <AnimatePresence>
            {errors?.secondPassword && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden" }}
              >
                <div className="error-component">
                  {errors.secondPassword.message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {matchPassword && <div>Пароли не совпадают</div>}
          <input type="submit" value="Регистрация" className="submit-button" />
        </form>
      </div>

      <div className={"accept"}>
        Регистрируясь, вы принимаете{" "}
        <Link to="/" style={{ textDecoration: "none", color: "#6d9bee" }}>
          лицензионное соглашение
        </Link>
      </div>
    </div>
  );
};

export default RegisterFields;
