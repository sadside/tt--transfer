import { AnimatePresence, motion } from "framer-motion";
import styles from "./AddCity.module.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createIntercityCityThunk,
  getIntercityCitySuggestions,
  getIntercityRegionSuggestions,
  getRegionSuggestionsThunk,
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

  const titleButton = "Глобальный адрес";

  const tableContent = carsClasses.map((elem) => elem.carClass);

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
          <div className={`edit-sidebar-tab ${activeTab === 1 && "active"}`}>
            Глобальный адрес (в разработке)
          </div>
        </div>
      </div>

      {activeTab === 0 && (
        <div className="tariffs-edit-sidebar-content-wrapper-form">
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

            {/*<label>*/}
            {/*  <span className="required"></span>Длительность*/}
            {/*  <input type="text" className="tariff-data-input" />*/}
            {/*</label>*/}

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
        </div>
      )}

      {activeTab === 1 && (
        <div className="tariffs-edit-sidebar-content-wrapper-form">
          <form className="tariffs-edit-sidebar-content-form">
            <label>
              <span className="required">*</span>Глобальный адрес
              <input type="text" className="tariff-data-input" />
            </label>

            <label>
              <span className="required"></span>Длительность
              <input type="text" className="tariff-data-input" />
            </label>

            <label>
              <Button text={titleButton} style={{ width: 180 }} />
            </label>

            <label>
              <span className="required"></span>Расстояние
              <input type="text" className="tariff-data-input" />
            </label>
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
