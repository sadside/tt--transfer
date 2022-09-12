import "./addTarifinputs.scss";
import { AnimatePresence, motion } from "framer-motion";
import downArrowSelect from "../../assets/downArrowSelect.svg";
import React, { useState } from "react";
import useOutside from "../../hooks/useOutside";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCitySuggestionsThunk,
  getRegionSuggestionsThunk,
  setTariffCity,
  setTariffRegion,
  setTariffName,
  createTariffThunk,
} from "../../store/tariffSlice";
import CustomSelect from "../customSelect/CustomSelect";
import ErrorComponent from "../errorComponent/ErrorComponent";
import Loader from "../loader/Loader";
import Select from "../select/Select";
import Button from "../ui/button/Button";
import styles from "./AddTariffInputs.module.scss";

export interface AddTariffInputsProps {}

const AddTariffInputs: React.FC<AddTariffInputsProps> = () => {
  const selectItems = ["Российский рубль", "Американский доллар"];
  const { isShow, ref, setIsShow } = useOutside(false);
  const [item, setItem] = useState("Российский рубль");
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useAppDispatch();

  const regionSuggestions = useAppSelector(
    (state) => state.tariff.regionSuggestions
  );

  const citySuggestions = useAppSelector(
    (state) => state.tariff.citySuggestions
  );

  const error = useAppSelector((state) => state.tariff.error);

  const tariffRegion = useAppSelector((state) => state.tariff.tariffRegion);
  const tariffCity = useAppSelector((state) => state.tariff.tariffCity);
  const tariffName = useAppSelector((state) => state.tariff.tariffName);
  const tariff = useAppSelector((state) => state.tariff.activeTariff);
  const status = useAppSelector((state) => state.tariff.status);

  // inputs state

  const [region, setRegion] = useState<string>(tariffRegion);
  const [city, setCity] = useState<string>(tariffCity);
  // const [tariffName, setTariffName] = useState<string>("");

  const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
    dispatch(setTariffRegion(null));
    dispatch(getRegionSuggestionsThunk(e.target.value));
  };

  const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    dispatch(setTariffCity(null));
    dispatch(getCitySuggestionsThunk(e.target.value));
  };

  const tariffNameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTariffName(e.target.value);
    dispatch(setTariffName(e.target.value));
  };

  const toggleVisibleSidebar = () => {
    setShowSidebar(true);
  };

  return (
    <form
      action=""
      onSubmit={(e: any) => {
        e.preventDefault();
        dispatch(
          createTariffThunk({
            region: tariffRegion,
            city: tariffCity,
            name: tariffName,
          })
        );
      }}
    >
      <div className="tariffs-edit-sidebar-content-inputs">
        {error === "Tariff already created" && (
          <ErrorComponent text={"Тариф с таким именем уже создан"} />
        )}
        <div className="tariff-data">
          <label>
            <span className="required">*</span>Название тарифа
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Введите название"
              value={tariffName}
              onChange={tariffNameInputHandler}
            />
          </label>
          <label>
            <span className="required">*</span>Регион
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Введите название"
              value={region}
              onChange={regionInputHandler}
            />
            <AnimatePresence>
              {regionSuggestions.length > 0 && !tariffRegion && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "Tween" }}
                  style={{ zIndex: 100000000, position: "relative" }}
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
              {citySuggestions?.length > 0 && !tariffCity && (
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
          <label>
            <div className="tariff-select-currency" ref={ref}>
              <div>
                <div>
                  <span className="required">*</span>Валюта
                </div>
                <div
                  className="tariff-data-select"
                  onClick={() => setIsShow(!isShow)}
                >
                  <div>{item}</div>
                  <img src={downArrowSelect} alt="" />
                </div>
              </div>
              <CustomSelect
                items={selectItems}
                isVisible={isShow}
                setItem={setItem}
                setVisible={setIsShow}
                setShowSidebar={toggleVisibleSidebar}
                showAll={false}
              />
            </div>
          </label>
          {!tariff && status === "idle" && (
            <input
              style={{ marginTop: 20, fontSize: 14 }}
              type="submit"
              value="Создать тариф"
              className="submit-button"
            />
          )}
        </div>
        <div className="tariff-comment">
          <label>
            <span className="required">*</span>Срок действия тарифа
            <input
              type="text"
              className="tariff-data-input tariff-data-input-correct"
              value={"31.31.31"} // Вадим, твой выход
            />
          </label>
          <label>
            Комментарии
            <textarea name="" id="" placeholder="Введите текст"></textarea>
          </label>
        </div>
      </div>
      {status === "tariff creating" && <Loader />}
    </form>
  );
};

export default AddTariffInputs;
