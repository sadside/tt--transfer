import { Box } from "@chakra-ui/react";
import {
  Map,
  Placemark,
  Polygon,
  YMaps,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import mapIcon from "../../assets/map.png";
import downArrow from "../../assets/select-zone-color.svg";
import useOutside from "../../hooks/useOutside";

import {
  addHubThunk,
  clearFromHub,
  clearToHub,
  getRegionsThunk,
  setActiveHub,
  setShowModal,
} from "../../store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addZoneThunk, getZonesById } from "../../store/zoneSlice";
import { IFullHub } from "../../types/types";
import { HubFormValues } from "../calculator/Calculator";
import Loader from "../loader/Loader";
import Modal from "../modal/Modal";
import Select from "../select/Select";
import Button from "../ui/button/Button";
import Zone from "../zone/Zone";
import styles from "./ZoningHub.module.scss";

interface ZoningHub {}

export const ZoningHub = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<HubFormValues>();

  const activeRegion = useAppSelector((state) => state.calculator.activeRegion);
  const activeCity = useAppSelector((state) => state.calculator.activeCity);
  const zones = useAppSelector((state) => state.zone.zones);
  const regions = useAppSelector((state) => state.calculator.regions);
  let hubs = useAppSelector((state) => state.calculator.hubs);

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.calculator.loading);
  const activeHub = useAppSelector((state) => state.calculator.activeHub);

  const [iframeRef, setIframeRef] = useState(0);

  useEffect(() => {
    if (regions.length === 0) dispatch(getRegionsThunk());
  }, []);

  console.log("test: ", hubs);

  const [activeColor, setActiveColor] = useState("green");
  const [coordinates, setCoordinates] = useState("");
  const [showSelectHubFrom, setShowSelectHubFrom] = useState(false);
  const [selectActiveItem, setSelectActiveItem] = useState("");
  const [zoneTitle, setZoneTitle] = useState("");

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

  const {
    ref: colorSelectRef,
    isShow: colorSelectIsShow,
    setIsShow: colorSelectSetIsShow,
  } = useOutside(false);

  const showModal = useAppSelector((state) => state.calculator.showModal);

  const setModalActive = (bool: boolean) => {
    dispatch(setShowModal(bool));
  };

  const [showMap, setShowMap] = useState(false);

  const onSubmit: SubmitHandler<HubFormValues> = async ({
    name,
    description,
    coords,
  }) => {
    dispatch(addHubThunk({ title: name, description, coordinates: coords }));
  };

  const zoneColor = classNames([], {
    [styles.green]: activeColor === "green",
    [styles.blue]: activeColor === "blue",
    [styles.red]: activeColor === "red",
    [styles.yellow]: activeColor === "yellow",
  });

  useEffect(() => {
    colorSelectSetIsShow(false);
  }, [activeColor, colorSelectSetIsShow]);

  const createZone = () => {
    if (coordinates.length !== 0) {
      console.log(JSON.parse(coordinates));

      dispatch(
        addZoneThunk({
          coordinates: JSON.parse(coordinates),
          color: activeColor,
          title: zoneTitle,
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
  }, [hubs, setValue]);

  const cityCenterCoordinates = useAppSelector(
    (state) => state.calculator.hubCity.center
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
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
              {hubs &&
                hubs.map((hub) => (
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
            <input type="submit" className={styles.hubInputSubmit} />
          </div>
        </form>
      </Modal>

      {activeCity && activeRegion && (
        <div className={styles.hubActions}>
          <div className={styles.selectHubWrap}>
            <Select
              setShowSelect={setShowSelectHubFrom}
              showSelect={showSelectHubFrom}
              items={hubs || []}
              text={
                activeHub.title ||
                (hubs && hubs.length > 0 ? "Выберите хаб" : "Хабы отсутствуют")
              }
              secondCallback={(item: IFullHub) => {
                dispatch(setActiveHub(item));
                if (item.id) dispatch(getZonesById(item.id));
              }}
            />
          </div>
          <div className={styles.hubBtn}>
            <Button text={"Показать карту"} callback={() => setShowMap(true)} />
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
              rel="noreferrer"
            >
              <img src={mapIcon} alt="" width={30} />
            </a>
          </div>
        </div>
      )}
      {!activeHub?.id && (
        <Box
          height={200}
          fontSize={18}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          Выберите хаб для зонирования.
        </Box>
      )}
      {activeHub?.id && (
        <div>
          <div>
            <div className={styles.howToUse}>
              <div>
                Для зонирования хаба{" "}
                <strong>{activeHub?.title || activeRegion}</strong> откройте{" "}
                <a
                  href="https://yandex.ru/map-constructor/location-tool/?from=club"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  карту
                </a>{" "}
                и с помощью инструмента многоугольник прозонируйте хаб.
                Получившиеся координаты сохраните в отведенном поле, указав цвет
                зоны.
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
                style={{ marginRight: 30, width: 200, borderRadius: 3 }}
                placeholder={"Введите название зоны"}
                value={zoneTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setZoneTitle(e.target.value);
                }}
              />
              <input
                type="text"
                className={styles.coords}
                placeholder="Введите координаты зоны"
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
    </>
  );
};
