import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import rightArrow from "../../assets/rightArrow.svg";
import "./calculator.scss";
import useOutside from "../../hooks/useOutside";
import {
  filterCity,
  filterRegion,
  getRegionsThunk,
  setActiveCity,
  setActiveRegion,
} from "../../store/calculatorSlice";
//@ts-ignore
import downArrow from "../../assets/select-zone-color.svg";
import { addZone, addZoneThunk, getZone } from "../../store/zoneSlice";
//@ts-ignore
import ErrorComponent from "../errorComponent/ErrorComponent";
import Loader from "../loader/Loader";
import Zone from "../zone/Zone";
import styles from "./Calculator.module.scss";
import Button from "../ui/button/Button";
import { IZone } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Calculator = () => {
  const filteredRegions = useAppSelector(
    (state) => state.calculator.filteredRegions
  );
  const filteredCities = useAppSelector(
    (state) => state.calculator.filteredCities
  );
  const cities = useAppSelector((state) => state.calculator.cities);
  const activeRegion = useAppSelector((state) => state.calculator.activeRegion);
  const activeCity = useAppSelector((state) => state.calculator.activeCity);
  const zones = useAppSelector((state) => state.zone.zones);
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.calculator.loading);
  const error = useAppSelector((state) => state.calculator.error);

  const [regionInputValue, setRegionInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");

  useEffect(() => {
    dispatch(getRegionsThunk());
    if (activeRegion && activeCity) {
      setRegionInputValue(activeRegion.name);
      setCityInputValue(activeCity.name);
    }
  }, []);

  const { isShow, setIsShow, ref } = useOutside(false);
  const {
    isShow: isSecondShow,
    setIsShow: setIsSecond,
    ref: secondRef,
  } = useOutside(false);

  const [showColorSelect, setShowColorSelect] = useState(false);
  const [activeColor, setActiveColor] = useState("green");
  const [coordinates, setCoordinates] = useState("");

  const zoneColor = classNames([], {
    [styles.green]: activeColor === "green",
    [styles.blue]: activeColor === "blue",
    [styles.red]: activeColor === "red",
    [styles.yellow]: activeColor === "yellow",
  });

  useEffect(() => {
    setShowColorSelect(false);
  }, [activeColor]);

  const createZone = () => {
    if (coordinates.length !== 0) {
      console.log(JSON.parse(coordinates));

      dispatch(
        addZoneThunk({
          coordinates: JSON.parse(coordinates),
          color: activeColor,
        })
      );

      setCoordinates("");
    }
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      u1(
        `http://localhost:8000/map/zones/?region=${activeRegion?.name}&city=${activeCity?.name}`
      );
    });
  }, [zones]);

  function u1(u: any): void {
    // @ts-ignore
    document.getElementById("iframeid").src = u;
  }

  if (loading) {
    return <Loader />;
  }

  // if (error) {
  //   return <ErrorComponent text="Ошибка!" toggle={"dad"}/>;
  // }

  console.log("render");

  return (
    <>
      <div className="calculator-wrap">
        <div className={styles.selectCity}>
          <label>
            Введите <strong>регион</strong>:
          </label>
          <div className={styles.citySelectWrap}>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRegionInputValue(e.target.value);
                dispatch(filterRegion(e.target.value));
                dispatch(setActiveRegion(null));
                setIsShow(true);
              }}
              value={regionInputValue}
            />

            <AnimatePresence>
              {filteredRegions.length !== 0 && !activeRegion && isShow && (
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
                      {filteredRegions.map((city, index: number) => {
                        return (
                          <li
                            key={city.id}
                            onClick={() => {
                              dispatch(setActiveRegion(city));
                              setRegionInputValue(city.name);
                              setCityInputValue("");
                            }}
                          >
                            {city.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {activeRegion && cities?.length !== 0 && (
          <div className={styles.selectCity}>
            <label>
              Введите <strong>город</strong>
            </label>
            <div className={styles.citySelectWrap}>
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCityInputValue(e.target.value);
                  dispatch(filterCity(e.target.value));
                  dispatch(setActiveCity(null));
                  setIsSecond(true);
                }}
                value={cityInputValue}
              />

              <AnimatePresence>
                {/* @ts-expect-error TS(2774): This condition will always return true since this ... Remove this comment to see the full error message */}
                {filteredCities.length !== 0 && !activeCity && setIsSecond && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "Tween" }}
                    style={{ overflow: "hidden", zIndex: 1000 }}
                    ref={secondRef}
                  >
                    <div className={styles.citySelect}>
                      <ul>
                        {filteredCities.map((city, index) => {
                          return (
                            <li
                              key={city.id}
                              onClick={(): void => {
                                dispatch(setActiveCity(city));
                                setCityInputValue(city.name);
                                dispatch(getZone());
                              }}
                            >
                              {city.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        {activeRegion &&
          (activeCity ||
            activeRegion?.name === "Москва" ||
            activeRegion?.name === "Санкт-Петербург") && (
            <div>
              <div>
                <div className={styles.howToUse}>
                  <div>
                    Для зонирования города
                    <strong>
                      {activeCity?.name || activeRegion?.name}
                    </strong>{" "}
                    откройте{" "}
                    <a
                      href="https://yandex.ru/map-constructor/location-tool/?from=club"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      карту
                    </a>
                    и с помощью инструмента многоугольник прозонируйте город.
                    Получившиеся координаты сохраните в отведенном поле, указав
                    цвет зоны.
                  </div>
                </div>
              </div>
              <h2 className={styles.calculatorSubTitle}>
                Добавьте зоны для расчета
              </h2>
              <div className={styles.zonesWrap}>
                <div className={styles.addZone}>
                  <input
                    type="text"
                    className={styles.coords}
                    placeholder="Введите текст"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                  />
                  <div className={styles.selectZoneColor}>
                    <div
                      className={styles.selectZoneColorBlock}
                      onClick={() =>
                        setShowColorSelect((prevState) => !prevState)
                      }
                    >
                      <div className={zoneColor}>Выберите цвет</div>
                      <img src={downArrow} alt="" />
                    </div>
                    {showColorSelect && (
                      <div className={styles.selectZoneColorMenu}>
                        <div
                          className={styles.selectZoneColorMenuItem}
                          onClick={() => setActiveColor("green")}
                        >
                          <div className={styles.zoneIndicatorGreen}></div>
                          <div className={styles.zoneColorText}>Зеленый</div>
                        </div>
                        <div
                          className={styles.selectZoneColorMenuItem}
                          onClick={() => setActiveColor("blue")}
                        >
                          <div className={styles.zoneIndicatorBlue}></div>
                          <div className={styles.zoneColorText}>Синий</div>
                        </div>

                        <div
                          className={styles.selectZoneColorMenuItem}
                          onClick={() => setActiveColor("red")}
                        >
                          <div className={styles.zoneIndicatorRed}></div>
                          <div className={styles.zoneColorText}>Красный</div>
                        </div>

                        <div
                          className={styles.selectZoneColorMenuItem}
                          onClick={() => setActiveColor("yellow")}
                        >
                          <div className={styles.zoneIndicatorYellow}></div>
                          <div className={styles.zoneColorText}>Желтый</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className={styles.addZoneBtn} onClick={createZone}>
                    Добавить
                  </button>
                </div>
                <div className={styles.zones}>
                  {zones.map((zone) => (
                    <Zone
                      key={zone.id}
                      id={zone.id}
                      coordinates={zone.coordinates}
                      color={zone.color}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        <iframe
          src={`http://localhost:8000/map/zones/?region=${activeRegion?.name}&city=${activeCity?.name}`}
          frameBorder="0"
          width="100%"
          height={480}
          id="iframeid"
        ></iframe>
        {zones.length > 0 && activeRegion && activeCity && (
          <div className={styles.transferCalculatorWrap}>
            <div className="destination-selection calculator-inputs">
              <div className="from-calculator">
                Откуда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Откуда"
                />
              </div>
              <img src={rightArrow} alt="" />
              <div className="to-calculator">
                Куда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Куда"
                />
              </div>
            </div>
            <div className="calculator-additional-inputs">
              <div>
                <span style={{ color: "red" }}>*</span>Дополнительные заезды
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Откуда"
                />
              </div>
              <div className="select-car-class">
                <span style={{ color: "red" }}>*</span>Выберите класс авто
                <select name="" id="" className="tariff-data-input">
                  <option value="">Премиум</option>

                  <option value="">Премиум</option>

                  <option value="">Премиум</option>

                  <option value="">Премиум</option>
                </select>
              </div>
            </div>
            <div className="add-race">Добавить еще адрес</div>
            <div className="calculator-calc-button">
              <Button text="Рассчитать" style={{ height: 40, width: 180 }} />
            </div>
            <div className="route-info">
              <div className="left-route-info">
                <div>Расстояние: 421км</div>
                <div>Время: 7ч 9мин</div>
              </div>
              <div className="right-route-info">
                <div>Рекомендуемая стоимость:</div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginRight: 30 }}>
                    Заказчик: <span>15 000</span>
                  </div>

                  <div>
                    Водитель: <span>10 000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calculator;
