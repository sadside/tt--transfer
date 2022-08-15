import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import rightArrow from "../../assets/rightArrow.svg";
import "./calculator.scss";
import useOutside from "../../hooks/useOutside";
import { useSuggestions } from "../../hooks/useSuggestions";
import {
  filterCity,
  filterRegion,
  getRegionsThunk,
  setActiveCity,
  setActiveRegion,
} from "../../store/calculatorSlice";
//@ts-ignore
import downArrow from "../../assets/select-zone-color.svg";
import {
  addZone,
  addZoneThunk,
  createCity,
  getZone,
} from "../../store/zoneSlice";
//@ts-ignore
import ErrorComponent from "../errorComponent/ErrorComponent";
import Loader from "../loader/Loader";
import Zone from "../zone/Zone";
import styles from "./Calculator.module.scss";
import Button from "../ui/button/Button";
import { IZone } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";

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

  const [iframeRef, setIframeRef] = useState(0);

  const [regionInputValue, setRegionInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");

  const [suggestionsForTo, setSuggestionsForTo] = useState<Array<any>>([]);
  const [suggestionsForFrom, setSuggestionsForFrom] = useState<Array<any>>([]);

  const [showRotes, setShowRoutes] = useState(false);

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

  const [state, setState] = useState(0);
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [activeColor, setActiveColor] = useState("green");
  const [coordinates, setCoordinates] = useState("");

  const [fromCoordinates, setFromCoordinates] = useState({});
  const [toCoordinates, setToCoordinates] = useState({});

  const [additionalRaces, setAdditionalRaces] = useState<any[]>([
    {
      state: "",
      suggestions: [],
      coordinates: [],
    },
  ]);

  const zoneColor = classNames([], {
    [styles.green]: activeColor === "green",
    [styles.blue]: activeColor === "blue",
    [styles.red]: activeColor === "red",
    [styles.yellow]: activeColor === "yellow",
  });

  const handleSuggestionFromClick = (suggestion: any) => {
    setFromInputValue(suggestion.value);
    setFromCoordinates({
      lat: suggestion.data["geo_lat"],
      lon: suggestion.data["geo_lon"],
    });
  };

  const handleSuggestionToClick = (suggestion: any) => {
    setToInputValue(suggestion.value);
    setToCoordinates({
      lat: suggestion.data["geo_lat"],
      lon: suggestion.data["geo_lon"],
    });
  };

  const handleAdditionalRaceClick = (suggestion: any, input: any) => {
    input.state = suggestion.value;
    input.coordinates = [
      suggestion.data["geo_lat"],
      suggestion.data["geo_lon"],
    ];
    console.log("coords ", input.coordinates);
  };

  useEffect(() => {
    setShowColorSelect(false);
  }, [activeColor]);

  const iframeCoords: string = additionalRaces
    .map((item) => {
      if (item.coordinates.length !== 0) {
        return `&lat=${item.coordinates[0]}&lon=${item.coordinates[1]}`;
      }
    })
    .join("");

  console.log("main", iframeCoords);

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
    setIframeRef((prevState) => prevState + 1);
  }, [zones]);

  if (loading) {
    return <Loader />;
  }

  // if (error) {
  //   return <ErrorComponent text="Ошибка!" toggle={"dad"}/>;
  // }

  console.log("render");
  console.log(additionalRaces);
  console.log(fromCoordinates);

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
              {filteredRegions?.length !== 0 && !activeRegion && isShow && (
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
                {filteredCities?.length !== 0 && !activeCity && setIsSecond && (
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
                                dispatch(createCity(city.name));
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
                {zones?.length !== 0 && (
                  <div className={styles.zones}>
                    {zones?.map((zone) => (
                      <Zone
                        key={zone.id}
                        id={zone.id}
                        coordinates={zone.coordinates}
                        color={zone.color}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        {zones?.length !== 0 && activeCity && activeRegion && (
          <div className={styles.iframeWrap}>
            <iframe
              src={`http://localhost:8000/map/zones/?region=${activeRegion?.name}&city=${activeCity?.name}`}
              frameBorder="0"
              width="100%"
              height={480}
              id="iframeid"
              key={iframeRef}
            ></iframe>
          </div>
        )}
        {zones?.length > 0 && activeRegion && activeCity && (
          <div className={styles.transferCalculatorWrap}>
            <div className="destination-selection calculator-inputs">
              <div className="from-calculator">
                Откуда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Откуда"
                  value={fromInputValue}
                  onChange={async (e) => {
                    setFromInputValue(e.target.value);
                    const response = await axios.post(
                      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                      {
                        query: e.target.value,
                      },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization:
                            "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",
                        },
                      }
                    );
                    console.log(response.data.suggestions);
                    setFromCoordinates({});
                    setSuggestionsForFrom(response.data.suggestions);
                  }}
                />
                {fromInputValue.length !== 0 &&
                  Object.keys(fromCoordinates).length === 0 && (
                    <div className={styles.citySelect}>
                      <ul>
                        {suggestionsForFrom.map((suggestion, index: number) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                handleSuggestionFromClick(suggestion);
                                console.log(fromCoordinates);
                              }}
                            >
                              {suggestion.value}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
              </div>
              <img src={rightArrow} alt="" />
              <div className="to-calculator">
                Куда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Куда"
                  onChange={async (e) => {
                    setToInputValue(e.target.value);
                    const response = await axios.post(
                      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                      {
                        query: e.target.value,
                      },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization:
                            "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",
                        },
                      }
                    );
                    console.log(response.data.suggestions);
                    setToCoordinates({});
                    setSuggestionsForTo(response.data.suggestions);
                  }}
                  value={toInputValue}
                />
                {toInputValue.length !== 0 &&
                  Object.keys(toCoordinates).length === 0 && (
                    <div className={styles.citySelect}>
                      <ul>
                        {suggestionsForTo.map((suggestion, index: number) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                handleSuggestionToClick(suggestion);
                                console.log(fromCoordinates);
                              }}
                            >
                              {suggestion.value}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
            <div className="calculator-additional-inputs">
              <div>
                <span style={{ color: "red" }}>*</span>Дополнительные заезды
                {additionalRaces.map((item, index) => {
                  return (
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        className="tariff-data-input"
                        placeholder="Откуда"
                        value={item.state}
                        onChange={(e) => {
                          console.log(e.target.value);
                          item.state = e.target.value;

                          axios
                            .post(
                              "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                              {
                                query: e.target.value,
                              },
                              {
                                headers: {
                                  Accept: "application/json",
                                  Authorization:
                                    "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",
                                },
                              }
                            )
                            .then((response) => {
                              item.suggestions = response.data.suggestions;
                              item.coordinates = [];
                            });
                          setState(() => Math.random());
                        }}
                      />
                      {item.state.length !== 0 &&
                        item.coordinates.length === 0 && (
                          <div className={styles.citySelect}>
                            <ul>
                              {item.suggestions.map(
                                (suggestion: any, index: number) => {
                                  return (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        handleAdditionalRaceClick(
                                          suggestion,
                                          item
                                        );
                                        setState(() => Math.random());
                                      }}
                                    >
                                      {suggestion.value}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  );
                })}
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
            <div
              className="add-race"
              onClick={() =>
                setAdditionalRaces((prevState) => [
                  ...prevState,
                  {
                    state: "",
                    suggestions: [],
                    coordinates: [],
                  },
                ])
              }
            >
              Добавить еще адрес
            </div>
            <div className="calculator-calc-button">
              <Button
                text="Рассчитать"
                style={{ height: 40, width: 180 }}
                callback={() => setShowRoutes(true)}
              />
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
        {showRotes && activeCity && activeRegion && (
          <div className={styles.iframeWrap}>
            <iframe
              //@ts-ignore
              src={`http://localhost:8000/map/route/?region=${
                activeRegion?.name
                //@ts-ignore
              }&city=${activeCity?.name}&lat=${fromCoordinates?.lat}&lon=${
                //@ts-ignore
                fromCoordinates?.lon
              }${additionalRaces.length !== 0 && iframeCoords}&lat=${
                //@ts-ignore
                toCoordinates.lat
                //@ts-ignore
              }&lon=${toCoordinates.lon}`}
              frameBorder="0"
              width="100%"
              height={480}
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default Calculator;
