import {
  YMaps,
  Map,
  Polygon,
  Placemark,
  ZoomControl,
  ObjectManager,
} from "@pbe/react-yandex-maps";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { log } from "util";
import rightArrow from "../../assets/rightArrow.svg";
import "./calculator.scss";
import useOutside from "../../hooks/useOutside";
import mapIcon from "../../assets/map.png";

import {
  addHubThunk,
  clearFromHub,
  clearToHub,
  filterCity,
  filterRegion,
  getHubsThunk,
  getRegionsThunk,
  setActiveCity,
  setActiveFromHub,
  setActiveHub,
  setActiveRegion,
  setActiveToHub,
  setShowModal,
} from "../../store/calculatorSlice";
//@ts-ignore
import downArrow from "../../assets/select-zone-color.svg";
import {
  addZone,
  addZoneThunk,
  createCity,
  getZonesById,
} from "../../store/zoneSlice";
//@ts-ignore
import ErrorComponent from "../errorComponent/ErrorComponent";
import Loader from "../loader/Loader";
import Modal from "../modal/Modal";
import Select from "../select/Select";
import Zone from "../zone/Zone";
import styles from "./Calculator.module.scss";
import Button from "../ui/button/Button";
import { IFullHub, IZone } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";

export type HubFormValues = {
  name: string;
  description: string;
  coords: string;
};

const Calculator = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<HubFormValues>();

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
  let hubs = useAppSelector((state) => state.calculator.hubs);

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.calculator.loading);
  const error = useAppSelector((state) => state.calculator.error);
  const activeHub = useAppSelector((state) => state.calculator.activeHub);

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

  console.log("test: ", hubs);

  const [state, setState] = useState(0);
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [activeColor, setActiveColor] = useState("green");
  const [coordinates, setCoordinates] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [showSelectHubFrom, setShowSelectHubFrom] = useState(false);
  const [selectActiveItem, setSelectActiveItem] = useState("");

  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [selectSecondActiveItem, setSecondSelectActiveItem] = useState("");

  useEffect(() => {
    if (selectSecondActiveItem === "Уникальный адрес") {
      dispatch(clearToHub());
    }
  }, [selectSecondActiveItem]);

  useEffect(() => {
    if (selectActiveItem === "Уникальный адрес") {
      dispatch(clearFromHub());
    }
  }, [selectActiveItem]);

  const [showSelectHubTo, setShowSelectHubTo] = useState(false);

  const items = [
    {
      title: "Уникальный адрес",
    },
    {
      title: "Хаб",
    },
  ];

  const {
    ref: colorSelectRef,
    isShow: colorSelectIsShow,
    setIsShow: colorSelectSetIsShow,
  } = useOutside(false);

  const [fromCoordinates, setFromCoordinates] = useState<any>({});
  const [toCoordinates, setToCoordinates] = useState<any>({});

  const showModal = useAppSelector((state) => state.calculator.showModal);

  const setModalActive = (bool: boolean) => {
    dispatch(setShowModal(bool));
  };

  const [showMap, setShowMap] = useState(false);

  const onSubmit: SubmitHandler<HubFormValues> = ({
    name,
    description,
    coords,
  }) => {
    dispatch(addHubThunk({ title: name, description, coordinates: coords }));
  };

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
  };

  useEffect(() => {
    colorSelectSetIsShow(false);
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

  useEffect(() => {
    setValue("name", "");
    setValue("description", "");
    setValue("coords", "");
    setIframeRef((prevState) => prevState + 1);
  }, [hubs]);

  const [carClass, setCarClass] = useState("");
  const [showCarClassSelect, setShowCarClassSelect] = useState(false);
  const cityCenterCoordinates = useAppSelector(
    (state) => state.calculator.hubCity.center
  );

  if (loading) {
    return <Loader />;
  }

  // const coordinatesFrom = activeHubFrom.id
  //   ? `&lat=${activeHubFrom.coordinate.latitude}&lon=${activeHubFrom.coordinate.longitude}`
  //   : `&lat=${fromCoordinates.lat}&lon=${fromCoordinates.lon}`;

  const carClasses: Array<any> = [
    {
      title: "Стандарт",
    },
    {
      title: "Комфорт",
    },
    {
      title: "Минивен",
    },
    {
      title: "Бизнес класс",
    },
    {
      title: "Представительский",
    },
    {
      title: "SUV",
    },
    {
      title: "Микроавтобус",
    },
    {
      title: "Минивен Бизнес",
    },
    {
      title: "Микроавтобус Бизнес",
    },
    {
      title: "Автобус 30+",
    },
    {
      title: "Автобус 43+",
    },
    {
      title: "Автобус 50+",
    },
  ];

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
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
              Введите <strong>город:</strong>
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
                {filteredCities?.length !== 0 && !activeCity && isSecondShow && (
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
                              //@ts-ignore
                              onClick={(): void => {
                                dispatch(setActiveCity(city));
                                setCityInputValue(city.name);
                                dispatch(
                                  getHubsThunk({
                                    region: activeRegion.name,
                                    city: city.name,
                                  })
                                );
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
        <Modal active={showMap} setActive={setShowMap}>
          {cityCenterCoordinates.latitude && cityCenterCoordinates.longitude && (
            <YMaps>
              <Map
                defaultState={{
                  center: [
                    cityCenterCoordinates.latitude,
                    cityCenterCoordinates.longitude,
                  ],
                  zoom: 12,
                }}
                modules={["control.ZoomControl"]}
                width={"85vw"}
                height={"85vh"}
              >
                {hubs.map((hub) => (
                  <Placemark
                    geometry={[
                      hub.coordinate.latitude,
                      hub.coordinate.longitude,
                    ]}
                    options={{
                      preset: "islands#circleIcon",
                      iconColor: "orange",
                    }}
                  />
                ))}
                <ZoomControl
                  options={{
                    //@ts-ignore
                    float: "right",
                  }}
                />
                <Polygon
                  geometry={[
                    [
                      [55.80816874150234, 37.54518870312501],
                      [55.80816874150234, 37.806113996093764],
                      [55.678022224242454, 37.86104563671875],
                      [55.55211057833611, 37.534202375],
                      [55.80816874150234, 37.54518870312501],
                    ],
                  ]}
                  options={{
                    //@ts-ignore
                    fillColor: "#00FF00",
                    strokeColor: "#0000FF",
                    opacity: 0.5,
                    strokeWidth: 5,
                  }}
                />
              </Map>
            </YMaps>
          )}
        </Modal>

        <Modal active={showModal} setActive={setModalActive}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.addHub}>
              <div>Название хаба</div>
              <input
                type="text"
                placeholder={"Название"}
                className={styles.hubInput}
                {...register("name", {
                  required: "Это поле обязательно для заполнения!",
                })}
              />
              {errors?.name && (
                <div className="error-component">{errors.name.message}</div>
              )}
              <div>Описание хаба</div>
              <input
                type="text"
                placeholder={"Описание"}
                className={styles.hubInput}
                {...register("description", {
                  required: "Это поле обязательно для заполнения!",
                })}
              />
              {errors?.description && (
                <div className="error-component">
                  {errors.description.message}
                </div>
              )}
              <div>Координаты хаба</div>
              <input
                type="text"
                placeholder={"Координаты"}
                className={styles.hubInput}
                {...register("coords", {
                  required: "Это поле обязательно для заполнения!",
                })}
              />
              {errors?.coords && (
                <div className="error-component">{errors.coords.message}</div>
              )}
              {/*<div className={styles.hubInputSubmit}>Добавить хаб</div>*/}
              <input type="submit" className={styles.hubInputSubmit} />
            </div>
          </form>
        </Modal>
        {activeCity?.id && activeRegion?.id && (
          <div className={styles.hubActions}>
            <div className={styles.selectHubWrap}>
              <Select
                setShowSelect={setShowSelectHubFrom}
                showSelect={showSelectHubFrom}
                items={hubs}
                text={
                  activeHub.title ||
                  (hubs.length > 0 ? "Выберите хаб" : "Хабы отсутствуют")
                }
                secondCallback={(item: IFullHub) => {
                  dispatch(setActiveHub(item));
                  if (item.id) dispatch(getZonesById(item.id));
                }}
              />
            </div>
            <div className={styles.hubBtn}>
              <Button
                text={"Показать карту"}
                callback={() => setShowMap(true)}
              />
            </div>
            <div className={styles.hubBtn}>
              <Button
                text={"Добавить хаб"}
                callback={() => setModalActive(true)}
                style={{ backgroundColor: "#364150" }}
              />
            </div>
            <div className={styles.mapIcon}>
              <a
                href="https://yandex.ru/map-constructor/location-tool/?from=club"
                target="_blank"
              >
                <img src={mapIcon} alt="" width={30} />
              </a>
            </div>
          </div>
        )}
        {activeHub?.id && (
          <div>
            <div>
              <div className={styles.howToUse}>
                <div>
                  Для зонирования хаба{" "}
                  <strong>{activeHub?.title || activeRegion?.name}</strong>{" "}
                  откройте{" "}
                  <a
                    href="https://yandex.ru/map-constructor/location-tool/?from=club"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    карту
                  </a>{" "}
                  и с помощью инструмента многоугольник прозонируйте хаб.
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
                <div className={styles.selectZoneColor} ref={colorSelectRef}>
                  <div
                    className={styles.selectZoneColorBlock}
                    onClick={() => {
                      // setShowColorSelect((prevState) => !prevState);
                      colorSelectSetIsShow(!colorSelectIsShow);
                    }}
                  >
                    <div className={zoneColor}>Выберите цвет</div>
                    <img src={downArrow} alt="" />
                  </div>
                  {colorSelectIsShow && (
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
            {activeHub.coordinate.latitude && activeHub.coordinate.longitude && (
              <YMaps>
                <div style={{ marginTop: 20 }}>
                  <Map
                    defaultState={{
                      center: [
                        activeHub.coordinate.latitude,
                        activeHub.coordinate.longitude,
                      ],
                      zoom: 12,
                    }}
                    instanceRef={(ref) => {
                      ref && ref.behaviors.disable("scrollZoom");
                    }}
                    modules={["control.ZoomControl"]}
                    width={"100%"}
                    height={480}
                  >
                    {zones?.map((zone) => {
                      let color = "",
                        ru_color = "",
                        number;

                      switch (zone.color) {
                        case "green":
                          color = "#8DC73F";
                          ru_color = "Зеленая";
                          break;
                        case "blue":
                          color = "#337AB7";
                          ru_color = "Синяя";
                          break;
                        case "red":
                          color = "#DB5454";
                          ru_color = "Красная";
                          break;
                        case "yellow":
                          color = "#EAE509";
                          ru_color = "Желтая";
                          break;
                      }

                      return (
                        <Polygon
                          //@ts-ignore
                          geometry={[zone.coordinates]}
                          options={{
                            //@ts-ignore
                            fillColor: color,
                            strokeColor: "#0000FF",
                            opacity: 0.5,
                            strokeWidth: 0,
                          }}
                        />
                      );
                    })}
                    <Placemark
                      geometry={[
                        activeHub.coordinate.latitude,
                        activeHub.coordinate.longitude,
                      ]}
                      options={{
                        preset: "islands#circleIcon",
                        iconColor: "orange",
                        balloonContent: "hello",
                        openBalloonOnClick: true,
                      }}
                      modules={[
                        "objectManager.addon.objectsBalloon",
                        "objectManager.addon.objectsHint",
                      ]}
                      // properties={{
                      //   balloonContent: "hello",
                      // }}
                    />

                    <ZoomControl
                      options={{
                        //@ts-ignore
                        float: "right",
                      }}
                    />
                  </Map>
                </div>
              </YMaps>
            )}
          </div>
        )}

        {zones?.length !== 0 &&
          activeCity &&
          activeRegion &&
          cityCenterCoordinates.latitude &&
          cityCenterCoordinates.longitude && (
            <div className={styles.iframeWrap}>
              {/*<YMaps>*/}
              {/*  <Map*/}
              {/*    defaultState={{*/}
              {/*      center: [*/}
              {/*        cityCenterCoordinates.latitude,*/}
              {/*        cityCenterCoordinates.longitude,*/}
              {/*      ],*/}
              {/*      zoom: 12,*/}
              {/*    }}*/}
              {/*    modules={["control.ZoomControl"]}*/}
              {/*    width={"100%"}*/}
              {/*    height={480}*/}
              {/*  >*/}
              {/*    {hubs.map((hub) => (*/}
              {/*      <Placemark*/}
              {/*        geometry={[*/}
              {/*          hub.coordinate.latitude,*/}
              {/*          hub.coordinate.longitude,*/}
              {/*        ]}*/}
              {/*        options={{*/}
              {/*          preset: "islands#circleIcon",*/}
              {/*          iconColor: "orange",*/}
              {/*        }}*/}
              {/*      />*/}
              {/*    ))}*/}
              {/*    <ZoomControl*/}
              {/*      options={{*/}
              {/*        //@ts-ignore*/}
              {/*        float: "right",*/}
              {/*      }}*/}
              {/*    />*/}
              {/*    <Polygon*/}
              {/*      geometry={[*/}
              {/*        [*/}
              {/*          [55.80816874150234, 37.54518870312501],*/}
              {/*          [55.80816874150234, 37.806113996093764],*/}
              {/*          [55.678022224242454, 37.86104563671875],*/}
              {/*          [55.55211057833611, 37.534202375],*/}
              {/*          [55.80816874150234, 37.54518870312501],*/}
              {/*        ],*/}
              {/*      ]}*/}
              {/*      options={{*/}
              {/*        //@ts-ignore*/}
              {/*        fillColor: "#00FF00",*/}
              {/*        strokeColor: "#0000FF",*/}
              {/*        opacity: 0.5,*/}
              {/*        strokeWidth: 5,*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  </Map>*/}
              {/*</YMaps>*/}
              {/*<iframe*/}
              {/*  src={`http://localhost:8000/map/zones/?region=${activeRegion?.name}&city=${activeCity?.name}`}*/}
              {/*  frameBorder="0"*/}
              {/*  width="100%"*/}
              {/*  height={480}*/}
              {/*  id="iframeid"*/}
              {/*  key={iframeRef}*/}
              {/*></iframe>*/}
            </div>
          )}

        {/*{zones?.length > 0 && activeRegion && activeCity && (*/}
        {/*  <div className={styles.transferCalculatorWrap}>*/}
        {/*    <div className="destination-selection calculator-inputs">*/}
        {/*      <div className="from-calculator">*/}
        {/*        <Select*/}
        {/*          setShowSelect={setShowSelect}*/}
        {/*          showSelect={showSelect}*/}
        {/*          setSelectItem={setSelectActiveItem}*/}
        {/*          items={items}*/}
        {/*          text={selectActiveItem || items[0].title}*/}
        {/*        />*/}
        {/*        {selectActiveItem === "Хаб" ? (*/}
        {/*          <div style={{ marginTop: 20 }}>*/}
        {/*            <div style={{ marginBottom: 10 }}>Откуда</div>*/}
        {/*            <Select*/}
        {/*              setShowSelect={setShowSelectHubFrom}*/}
        {/*              showSelect={showSelectHubFrom}*/}
        {/*              items={hubs}*/}
        {/*              text={*/}
        {/*                activeHub.title || "Выберите хаб" || "Хабы отсутствуют"*/}
        {/*              }*/}
        {/*              haveButton={true}*/}
        {/*              callback={() => {*/}
        {/*                setModalActive(true);*/}
        {/*              }}*/}
        {/*              secondCallback={(item) => {*/}
        {/*                dispatch(setActiveHub(item));*/}
        {/*              }}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        ) : (*/}
        {/*          <div style={{ marginTop: 20 }}>*/}
        {/*            Откуда*/}
        {/*            <input*/}
        {/*              type="text"*/}
        {/*              className="tariff-data-input"*/}
        {/*              placeholder="Откуда"*/}
        {/*              value={fromInputValue}*/}
        {/*              onChange={async (e) => {*/}
        {/*                setFromInputValue(e.target.value);*/}
        {/*                const response = await axios.post(*/}
        {/*                  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",*/}
        {/*                  {*/}
        {/*                    query: e.target.value,*/}
        {/*                  },*/}
        {/*                  {*/}
        {/*                    headers: {*/}
        {/*                      Accept: "application/json",*/}
        {/*                      Authorization:*/}
        {/*                        "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",*/}
        {/*                    },*/}
        {/*                  }*/}
        {/*                );*/}
        {/*                console.log(response.data.suggestions);*/}
        {/*                setFromCoordinates({});*/}
        {/*                setSuggestionsForFrom(response.data.suggestions);*/}
        {/*              }}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        {fromInputValue.length !== 0 &&*/}
        {/*          Object.keys(fromCoordinates).length === 0 && (*/}
        {/*            <div className={styles.citySelect}>*/}
        {/*              <ul>*/}
        {/*                {suggestionsForFrom.map((suggestion, index: number) => {*/}
        {/*                  return (*/}
        {/*                    <li*/}
        {/*                      key={index}*/}
        {/*                      onClick={() => {*/}
        {/*                        handleSuggestionFromClick(suggestion);*/}
        {/*                        console.log(fromCoordinates);*/}
        {/*                      }}*/}
        {/*                    >*/}
        {/*                      {suggestion.value}*/}
        {/*                    </li>*/}
        {/*                  );*/}
        {/*                })}*/}
        {/*              </ul>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*      </div>*/}
        {/*      <img src={rightArrow} alt="" />*/}
        {/*      <div className="to-calculator">*/}
        {/*        <Select*/}
        {/*          setShowSelect={setShowSecondSelect}*/}
        {/*          showSelect={showSecondSelect}*/}
        {/*          setSelectItem={setSecondSelectActiveItem}*/}
        {/*          items={items}*/}
        {/*          text={selectSecondActiveItem || items[0].title}*/}
        {/*        />*/}

        {/*        {selectSecondActiveItem === "Хаб" ? (*/}
        {/*          <div style={{ marginTop: 20 }}>*/}
        {/*            <div style={{ marginBottom: 10 }}>Куда</div>*/}
        {/*            <Select*/}
        {/*              setShowSelect={setShowSelectHubTo}*/}
        {/*              showSelect={showSelectHubTo}*/}
        {/*              items={hubs}*/}
        {/*              text={*/}
        {/*                activeHub.title ||*/}
        {/*                "Выберите хаб" ||*/}
        {/*                "Хабы отсутствуют"*/}
        {/*              }*/}
        {/*              haveButton={true}*/}
        {/*              secondCallback={(item) => {*/}
        {/*                dispatch(setActiveToHub(item));*/}
        {/*              }}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        ) : (*/}
        {/*          <div style={{ marginTop: 20 }}>*/}
        {/*            Куда*/}
        {/*            <input*/}
        {/*              type="text"*/}
        {/*              className="tariff-data-input"*/}
        {/*              placeholder="Куда"*/}
        {/*              onChange={async (e) => {*/}
        {/*                setToInputValue(e.target.value);*/}
        {/*                const response = await axios.post(*/}
        {/*                  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",*/}
        {/*                  {*/}
        {/*                    query: e.target.value,*/}
        {/*                  },*/}
        {/*                  {*/}
        {/*                    headers: {*/}
        {/*                      Accept: "application/json",*/}
        {/*                      Authorization:*/}
        {/*                        "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",*/}
        {/*                    },*/}
        {/*                  }*/}
        {/*                );*/}
        {/*                console.log(response.data.suggestions);*/}
        {/*                setToCoordinates({});*/}
        {/*                setSuggestionsForTo(response.data.suggestions);*/}
        {/*              }}*/}
        {/*              value={toInputValue}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        {toInputValue.length !== 0 &&*/}
        {/*          Object.keys(toCoordinates).length === 0 && (*/}
        {/*            <div className={styles.citySelect}>*/}
        {/*              <ul>*/}
        {/*                {suggestionsForTo.map((suggestion, index: number) => {*/}
        {/*                  return (*/}
        {/*                    <li*/}
        {/*                      key={index}*/}
        {/*                      onClick={() => {*/}
        {/*                        handleSuggestionToClick(suggestion);*/}
        {/*                        console.log(fromCoordinates);*/}
        {/*                      }}*/}
        {/*                    >*/}
        {/*                      {suggestion.value}*/}
        {/*                    </li>*/}
        {/*                  );*/}
        {/*                })}*/}
        {/*              </ul>*/}
        {/*            </div>*/}
        {/*          )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="calculator-additional-inputs">*/}
        {/*      <div>*/}
        {/*        <span style={{ color: "red" }}>*</span>Дополнительные заезды*/}
        {/*        {additionalRaces.map((item, index) => {*/}
        {/*          return (*/}
        {/*            <div style={{ position: "relative" }}>*/}
        {/*              <input*/}
        {/*                type="text"*/}
        {/*                className="tariff-data-input"*/}
        {/*                placeholder="Откуда"*/}
        {/*                value={item.state}*/}
        {/*                onChange={(e) => {*/}
        {/*                  console.log(e.target.value);*/}
        {/*                  item.state = e.target.value;*/}

        {/*                  axios*/}
        {/*                    .post(*/}
        {/*                      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",*/}
        {/*                      {*/}
        {/*                        query: e.target.value,*/}
        {/*                      },*/}
        {/*                      {*/}
        {/*                        headers: {*/}
        {/*                          Accept: "application/json",*/}
        {/*                          Authorization:*/}
        {/*                            "Token 48ab36191d6ef5b11a3ae58d406b7d641a1fbd32",*/}
        {/*                        },*/}
        {/*                      }*/}
        {/*                    )*/}
        {/*                    .then((response) => {*/}
        {/*                      item.suggestions = response.data.suggestions;*/}
        {/*                      item.coordinates = [];*/}
        {/*                    });*/}
        {/*                  setState(() => Math.random());*/}
        {/*                }}*/}
        {/*              />*/}
        {/*              {item.state.length !== 0 &&*/}
        {/*                item.coordinates.length === 0 && (*/}
        {/*                  <div className={styles.citySelect}>*/}
        {/*                    <ul>*/}
        {/*                      {item.suggestions.map(*/}
        {/*                        (suggestion: any, index: number) => {*/}
        {/*                          return (*/}
        {/*                            <li*/}
        {/*                              key={index}*/}
        {/*                              onClick={() => {*/}
        {/*                                handleAdditionalRaceClick(*/}
        {/*                                  suggestion,*/}
        {/*                                  item*/}
        {/*                                );*/}
        {/*                                setState(() => Math.random());*/}
        {/*                              }}*/}
        {/*                            >*/}
        {/*                              {suggestion.value}*/}
        {/*                            </li>*/}
        {/*                          );*/}
        {/*                        }*/}
        {/*                      )}*/}
        {/*                    </ul>*/}
        {/*                  </div>*/}
        {/*                )}*/}
        {/*            </div>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*      </div>*/}
        {/*      <div className={"select-car-class"}>*/}
        {/*        <div style={{ marginBottom: 10 }}>*/}
        {/*          <span style={{ color: "red" }}>*</span>Выберите класс авто*/}
        {/*        </div>*/}
        {/*        <Select*/}
        {/*          setShowSelect={setShowCarClassSelect}*/}
        {/*          showSelect={showCarClassSelect}*/}
        {/*          items={carClasses}*/}
        {/*          setSelectItem={setCarClass}*/}
        {/*          text={carClass || carClasses[0].title}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div*/}
        {/*      className="add-race"*/}
        {/*      onClick={() =>*/}
        {/*        setAdditionalRaces((prevState) => [*/}
        {/*          ...prevState,*/}
        {/*          {*/}
        {/*            state: "",*/}
        {/*            suggestions: [],*/}
        {/*            coordinates: [],*/}
        {/*          },*/}
        {/*        ])*/}
        {/*      }*/}
        {/*    >*/}
        {/*      Добавить еще адрес*/}
        {/*    </div>*/}
        {/*    <div className="calculator-calc-button">*/}
        {/*      <Button*/}
        {/*        text="Рассчитать"*/}
        {/*        style={{ height: 40, width: 180 }}*/}
        {/*        callback={() => {*/}
        {/*          setShowRoutes(true);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className="route-info">*/}
        {/*      <div className="left-route-info">*/}
        {/*        <div>Расстояние: 421км</div>*/}
        {/*        <div>Время: 7ч 9мин</div>*/}
        {/*      </div>*/}
        {/*      <div className="right-route-info">*/}
        {/*        <div>Рекомендуемая стоимость:</div>*/}
        {/*        <div*/}
        {/*          style={{ display: "flex", justifyContent: "space-between" }}*/}
        {/*        >*/}
        {/*          <div style={{ marginRight: 30 }}>*/}
        {/*            Заказчик: <span>15 000</span>*/}
        {/*          </div>*/}

        {/*          <div>*/}
        {/*            Водитель: <span>10 000</span>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </>
  );
};

export default Calculator;
