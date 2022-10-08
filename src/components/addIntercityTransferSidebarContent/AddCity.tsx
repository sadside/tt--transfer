import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  $activeHub,
  $hubInputValue,
  $hubSuggestions,
  hubInputChanged,
  suggestionClicked,
} from "../../effector/tariffs/editTariff/editIntercityRoute/editIntercityRoute";
import { IInitialGlobalAddress } from "../../types/types";
import { GlobalAddressItem } from "../globalAddressItem/GlobalAddressItem";
import Loader from "../loader/Loader";
import styles from "./AddCity.module.scss";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createGlobalAddressThunk,
  createIntercityCityThunk,
  createRouteWithGlobalAddress,
  createRouteWithHubThunk,
  getGlobalAddressesSuggestion,
  getIntercityCitySuggestions,
  getIntercityRegionSuggestions,
  getRegionSuggestionsThunk,
  setActiveGlobalAddress,
  setGlobalAddressInputValue,
  setIntercityCity,
  setIntercityRegion,
  setTariffRegion,
} from "../../store/tariffSlice";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarTableHeader from "../editSidebarTableHeader/SidebarTableHeader";
import { carsClasses } from "../../db";
import "./addIntercityTransferSidebarContent.scss";
import Button from "../ui/button/Button";

const AddCity = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useAppDispatch();

  const tableContent = carsClasses.map((elem) => elem.carClass);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInitialGlobalAddress>();

  const tariffRegion = useAppSelector((state) => state.tariff.intercityRegion);
  const tariffCity = useAppSelector((state) => state.tariff.intercityCity);

  const [region, setRegion] = useState<string>(tariffRegion);
  const [city, setCity] = useState<string>(tariffCity);

  const regionSuggestions = useAppSelector(
    (state) => state.tariff.intercityRegionSuggestions
  );

  const citySuggestions = useAppSelector(
    (state) => state.tariff.intercityCitySuggestions
  );

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
  const activeTariff = useAppSelector((state) => state.tariff.activeTariff);

  const hubInputValue = useUnit($hubInputValue);
  const hubSuggestions = useUnit($hubSuggestions);
  const activeHub = useUnit($activeHub);

  const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
    dispatch(setIntercityRegion(null));
    dispatch(getIntercityRegionSuggestions(e.target.value));
  };

  const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    dispatch(setIntercityCity(null));
    dispatch(getIntercityCitySuggestions(e.target.value));
  };

  useEffect(() => {
    return () => {
      dispatch(setIntercityCity(null));
      dispatch(setIntercityRegion(null));
    };
  }, []);

  const creatingRoute = status === "creating city";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activeGlobalAddress)
      dispatch(createRouteWithGlobalAddress(globalAddressInputValue));
  };

  const createGlobalAddress = (data: IInitialGlobalAddress) => {
    dispatch(createGlobalAddressThunk(data));
  };

  const handleHubInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    hubInputChanged(e.target.value);
  };

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <div className="tariffs-edit-sidebar-content-wrapper-header">
        <div className="edit-sidebar-tabs">
          <div
            className={`edit-sidebar-tab ${activeTab === 0 && "active"}`}
            onClick={() => setActiveTab(0)}
          >
            Город
          </div>
          <div
            className={`edit-sidebar-tab ${activeTab === 1 && "active"}`}
            onClick={() => setActiveTab(1)}
          >
            Глобальный адрес
          </div>
          <div
            className={`edit-sidebar-tab ${activeTab === 2 && "active"}`}
            onClick={() => setActiveTab(2)}
          >
            Хаб
          </div>
        </div>
      </div>

      {activeTab === 0 && (
        <div className="tariffs-edit-sidebar-content-wrapper-form">
          <h2 className={styles.addCityTitle}>Создание маршрута с городом.</h2>
          <form
            className="tariffs-edit-sidebar-content-form"
            onSubmit={(e: any) => e.preventDefault()}
          >
            <label>
              <span className="required">*</span>Регион
              <input
                type="text"
                className="tariff-data-input"
                value={region}
                onChange={regionInputHandler}
              />
              <AnimatePresence>
                {regionSuggestions.length > 0 &&
                  !tariffRegion &&
                  region?.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "Tween" }}
                      style={{ zIndex: 100000000, position: "relative" }}
                    >
                      <div className={styles.citySelect}>
                        <ul>
                          {regionSuggestions.map(
                            (region: any, index: number) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => {
                                    dispatch(setIntercityRegion(region));
                                    setRegion(region);
                                    setCity("");
                                  }}
                                >
                                  {region}
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

            <label>
              <span className="required">*</span>Город
              <input
                type="text"
                className="tariff-data-input"
                value={city}
                onChange={cityInputHandler}
              />
              <AnimatePresence>
                {citySuggestions?.length > 0 &&
                  !tariffCity &&
                  tariffRegion &&
                  city.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "Tween" }}
                      style={{ zIndex: 100, position: "relative" }}
                    >
                      <div className={styles.citySelect}>
                        <ul>
                          {citySuggestions.map((city, index: number) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  dispatch(setIntercityCity(city));
                                  setCity(city);
                                }}
                              >
                                {city}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </label>
            <label>
              <div style={{ alignItems: "center", display: "flex" }}>
                <input type="checkbox" className={styles.doubleRoute} /> Создать
                направление в 2 тарифах.
              </div>
            </label>
            <Button
              callback={() => {
                dispatch(
                  createIntercityCityThunk({
                    region: tariffRegion,
                    city: tariffCity,
                  })
                );
              }}
              text={"Создать маршрут"}
              style={{ marginTop: 30 }}
            />
          </form>
          {status === "creating city" && (
            <div style={{ marginTop: 120 }}>
              <Loader />
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className="tariffs-edit-sidebar-content-wrapper-form">
          <h2 className={styles.addCityTitle}>
            Создание маршрута с глобальным адресом.
          </h2>
          <form
            className="tariffs-edit-sidebar-content-form"
            onSubmit={onSubmit}
          >
            <label>
              <span className="required">*</span>Глобальный адрес
              <input
                type="text"
                className="tariff-data-input"
                placeholder={"Введите адрес"}
                value={globalAddressInputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  dispatch(setGlobalAddressInputValue(e.target.value));
                  // dispatch(getGlobalAddressesSuggestion());
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
                                    dispatch(
                                      setGlobalAddressInputValue(address)
                                    );
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
            {status === "creating city" && (
              <div style={{ marginTop: 120 }}>
                <Loader />
              </div>
            )}
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
            {status === "creating city" && (
              <div style={{ marginTop: 120 }}>
                <Loader />
              </div>
            )}
          </form>
        </div>
      )}

      {activeTab === 2 && (
        <div className="tariffs-edit-sidebar-content-wrapper-form">
          <h2 className={styles.addCityTitle}>Создание маршрута с хабом.</h2>
          <form
            action=""
            className="tariffs-edit-sidebar-content-form"
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          >
            <label>
              <span className="required">*</span>Хаб
              <input
                type="text"
                className="tariff-data-input"
                placeholder={"Введите хаб"}
                onChange={handleHubInputChange}
                value={hubInputValue}
              />
              <AnimatePresence>
                {hubSuggestions.length > 0 &&
                  !tariffRegion &&
                  region?.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "Tween" }}
                      style={{ zIndex: 100000000, position: "relative" }}
                    >
                      <div className={styles.citySelect}>
                        <ul>
                          {hubSuggestions.map((hub: any, index: number) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  suggestionClicked(hub);
                                }}
                              >
                                {hub}
                              </li>
                            );
                          })}
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
              callback={() => {
                if (activeHub) dispatch(createRouteWithHubThunk(activeHub));
              }}
            />

            {creatingRoute && (
              <div style={{ marginTop: 120 }}>
                <Loader />
              </div>
            )}
          </form>
        </div>
      )}

      {/*<div className="submit-buttons-wrap">*/}
      {/*  <EditSidebarSubmitButtons />*/}
      {/*</div>*/}
    </div>
  );
};

export default AddCity;
