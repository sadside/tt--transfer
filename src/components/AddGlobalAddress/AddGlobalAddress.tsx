import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createGlobalAddressThunk,
  createRouteWithGlobalAddress,
  getGlobalAddressesSuggestion,
  setActiveGlobalAddress,
  setGlobalAddressInputValue,
} from "../../store/tariffSlice";
import { IInitialGlobalAddress } from "../../types/types";
import Loader from "../loader/Loader";
import Button from "../ui/button/Button";
import styles from "./AddGlobalAddress.module.scss";

const AddGlobalAddress = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IInitialGlobalAddress>();

  const globalAddressSuggestions = useAppSelector(
    (state) => state.tariff.globalAddressSuggestions
  );

  const globalAddressInputValue = useAppSelector(
    (state) => state.tariff.globalAddressInputValue
  );

  const activeGlobalAddress = useAppSelector(
    (state) => state.tariff.activeGlobalAddress
  );

  const status = useAppSelector((state) => state.tariff.status);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeGlobalAddress)
      dispatch(createRouteWithGlobalAddress(globalAddressInputValue));
  };

  const createGlobalAddress = (data: IInitialGlobalAddress) => {
    dispatch(createGlobalAddressThunk(data));
    reset();
  };

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <div className="tariffs-edit-sidebar-content-wrapper-header">
        <div className="edit-sidebar-tabs">
          <div className={`edit-sidebar-tab active`}>Глобальный адрес</div>
        </div>
      </div>

      <div className="tariffs-edit-sidebar-content-wrapper-form">
        <h2 className={styles.addCityTitle}>
          Создание маршрута с глобальным адресом.
        </h2>
        <form className="tariffs-edit-sidebar-content-form" onSubmit={onSubmit}>
          <label>
            <span className="required">*</span>Глобальный адрес
            <input
              type="text"
              style={{ width: 560 }}
              className="tariff-data-input"
              placeholder={"Введите адрес"}
              value={globalAddressInputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                dispatch(setGlobalAddressInputValue(e.target.value));
                dispatch(getGlobalAddressesSuggestion());
                dispatch(setActiveGlobalAddress(""));
              }}
            />
            <AnimatePresence>
              {globalAddressSuggestions.length > 0 &&
                !activeGlobalAddress &&
                globalAddressInputValue.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "Tween" }}
                    style={{ zIndex: 100000000, position: "relative" }}
                  >
                    <div className={styles.citySelect}>
                      <ul>
                        {globalAddressSuggestions.map(
                          (address: any, index: number) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  dispatch(setActiveGlobalAddress(address));
                                  dispatch(setGlobalAddressInputValue(address));
                                }}
                              >
                                {address}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </label>

          <Button
            text={"Создать маршрут"}
            style={{ marginTop: 30 }}
            typeSubmit={true}
          />
        </form>

        <h2 className={styles.addCityTitle} style={{ marginTop: 50 }}>
          Создание глобального адреса.
        </h2>
        <form
          className="tariffs-edit-sidebar-content-form"
          onSubmit={handleSubmit(createGlobalAddress)}
        >
          <label>
            <span className="required">*</span>Глобальный адрес
            <input
              type="text"
              className="tariff-data-input"
              placeholder={"Введите адрес"}
              {...register("address", {
                required: "Это поле обязательно",
              })}
            />
          </label>
          <label>
            <span className="required">*</span>Координаты
            <input
              type="text"
              className="tariff-data-input"
              placeholder={"Введите координаты"}
              {...register("coordinates", {
                required: "Это поле обязательно",
              })}
            />
          </label>

          <Button
            text={"Создать глобальный адрес"}
            style={{ marginTop: 30 }}
            typeSubmit={true}
          />
        </form>
      </div>
    </div>
  );
};

export default AddGlobalAddress;
