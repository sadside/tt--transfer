import { Map, Polygon, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";

import {
  createCityZoneThunk,
  getRegionsThunk,
} from "../../store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Loader from "../loader/Loader";
import Zone from "../zone/Zone";
import styles from "./ZonningCity.module.scss";

interface ZoningHub {}

export const ZoningCity = () => {
  const activeRegion = useAppSelector((state) => state.calculator.activeRegion);
  const activeCity = useAppSelector((state) => state.calculator.activeCity);
  const regions = useAppSelector((state) => state.calculator.regions);
  const zone = useAppSelector((state) => state.calculator.cityZone);

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.calculator.loading);

  useEffect(() => {
    if (regions.length === 0) dispatch(getRegionsThunk());
  }, []);

  const [coordinates, setCoordinates] = useState("");

  const cityCenterCoordinates = useAppSelector(
    (state) => state.calculator.hubCity.center
  );

  const createZone = () => {
    if (coordinates.length !== 0) {
      dispatch(
        createCityZoneThunk({
          region: activeRegion,
          city: activeCity,
          coordinates: JSON.parse(coordinates),
        })
      );
      setCoordinates("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ marginTop: 30 }}>
        <div>
          <div className={styles.howToUse}>
            <div>
              Для зонирования города <strong>{activeCity}</strong> откройте{" "}
              <a
                href="https://yandex.ru/map-constructor/location-tool/?from=club"
                target={"_blank"}
                rel="noreferrer"
              >
                карту
              </a>{" "}
              и с помощью инструмента многоугольник прозонируйте город.
              Получившиеся координаты сохраните в отведенном поле.
            </div>
          </div>
        </div>
        <h2 className={styles.calculatorSubTitle}>Добавьте зону для расчета</h2>
        <div className={styles.zonesWrap}>
          <div className={styles.addZone}>
            <input
              type="text"
              className={styles.coords}
              placeholder="Введите координаты зоны"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
            />
            <button className={styles.addZoneBtn} onClick={createZone}>
              Добавить
            </button>
          </div>
          {zone?.coordinates?.length > 0 && (
            <Zone
              color={"red"}
              id={1}
              coordinates={JSON.stringify(zone.coordinates)}
            />
          )}
        </div>
        {cityCenterCoordinates?.latitude && cityCenterCoordinates.longitude && (
          <YMaps>
            <div style={{ marginTop: 20 }}>
              <Map
                defaultState={{
                  center: [
                    cityCenterCoordinates.latitude,
                    cityCenterCoordinates.longitude,
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
                {zone?.coordinates?.length > 0 && (
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
                )}
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
    </>
  );
};
