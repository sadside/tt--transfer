import "./addTarifinputs.scss";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import useOutside from "../../hooks/useOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCitySuggestionsThunk,
  getRegionSuggestionsThunk,
  setTariffCity,
  setTariffRegion,
} from "../../store/tariffSlice";
import Select from "../select/Select";
import styles from "./AddTariffInputs.module.scss";

export interface AddTariffInputsProps {}

const AddTariffInputs: React.FC<AddTariffInputsProps> = () => {
  const dispatch = useAppDispatch();

  const regionSuggestions = useAppSelector(
    (state) => state.tariff.regionSuggestions
  );

  const citySuggestions = useAppSelector(
    (state) => state.tariff.citySuggestions
  );

  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { isShow, setIsShow, ref } = useOutside(false);

  const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") dispatch(setTariffRegion(""));
    setRegion(e.target.value);
    dispatch(getRegionSuggestionsThunk(e.target.value));
  };

  const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") dispatch(setTariffCity(""));
    setCity(e.target.value);
    dispatch(getCitySuggestionsThunk(e.target.value));
  };

  return (
    <div className="tariffs-edit-sidebar-content-inputs">
      <div className="tariff-data">
        <label>
          <span className="required">*</span>Название тарифа
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
          />
        </label>
        <label>
          <span className="required">*</span>Регион
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название2"
            value={region}
            onChange={regionInputHandler}
          />
          <AnimatePresence>
            {regionSuggestions.length > 0 && isShow && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden", zIndex: 1000 }}
                ref={ref}
              >
                <div className={styles.citySelect}>
                  <ul>
                    {regionSuggestions.map((region, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            dispatch(setTariffRegion(region));
                            setRegion(region);
                            setCity("");
                          }}
                        >
                          {region}
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
          <span className="required">*</span>Город
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
            onChange={cityInputHandler}
            value={city}
          />
          <AnimatePresence>
            {citySuggestions.length > 0 && isShow && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ overflow: "hidden", zIndex: 1000 }}
                ref={ref}
              >
                <div className={styles.citySelect}>
                  <ul>
                    {citySuggestions.map((city, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            dispatch(setTariffCity(city));
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
      </div>
      <div className="tariff-comment">
        <label>
          Комментарии
          <textarea name="" id="" placeholder="Введите текст"></textarea>
        </label>
      </div>
    </div>
  );
};

export default AddTariffInputs;
