import { nanoid } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import { useUnit } from "effector-react";
import { ChangeEvent, FC, useState } from "react";
import rightArrow from "../../assets/rightArrow.svg";
import { carsClasses } from "../../db";
import {
  $activeCity,
  $activeRegion,
  $cityInputValue,
  $citySuggestions,
  $regionInputValue,
  $regionSuggestions,
  cityInputChanged,
  regionInputChanged,
} from "../../effector/calculator/calculatorLocation";
import { API } from "../../http";
import {
  addAdditionalRace,
  clearFromHub,
  clearToHub,
  setActiveAddressFrom,
  setActiveAddressTo,
  setActiveFromHub,
  setActiveToHub,
  setAddressFromType,
  setAddressToType,
} from "../../store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSuggestions } from "../../store/zoneSlice";
import { IAdditionalRace, IFullHub } from "../../types/types";
import AdditionalRace from "../additionalRace/AdditionalRace";
import EditAddress from "../editAddress/EditAddress";
import Modal from "../modal/Modal";
import Select from "../select/Select";
import Button from "../ui/button/Button";
import styles from "./Routes.module.scss";

const Routes: FC = () => {
  const hubs = useAppSelector((state) => state.calculator.hubs);
  const activeHubTo = useAppSelector((state) => state.calculator.activeToHub);
  const additionalRaces = useAppSelector(
    (state) => state.calculator.additionalRaces
  );

  const [showSelect, setShowSelect] = useState(false);
  const [showSelectHubFrom, setShowSelectHubFrom] = useState(false);

  const addressFromType = useAppSelector(
    (state) => state.calculator.addressFromType
  );

  const addressToType = useAppSelector(
    (state) => state.calculator.addressToType
  );

  const setSelectActiveItem = (type: string) => {
    dispatch(setAddressFromType(type));
    dispatch(
      setActiveAddressFrom({
        address: "",
        coordinates: {
          lat: null,
          lon: null,
        },
      })
    );
    dispatch(clearFromHub());
  };

  const setSecondSelectActiveItem = (type: string) => {
    dispatch(setAddressToType(type));
    dispatch(
      setActiveAddressTo({
        address: "",
        coordinates: {
          lat: null,
          lon: null,
        },
      })
    );
    dispatch(clearToHub());
  };

  const activeHubFrom = useAppSelector(
    (state) => state.calculator.activeFromHub
  );

  const activeAddressFrom = useAppSelector(
    (state) => state.calculator.activeAddressFrom
  );
  const activeAddressTo = useAppSelector(
    (state) => state.calculator.activeAddressTo
  );

  const filteredHubs = hubs.filter((hub: IFullHub) => {
    return hub.id !== activeHubTo.id && hub.id !== activeHubFrom.id;
  });
  const [fromCoordinates, setFromCoordinates] = useState<any>({});

  const coordinatesFrom = activeHubFrom.id
    ? `&lat=${activeHubFrom.coordinate.latitude}&lon=${activeHubFrom.coordinate.longitude}`
    : `&lat=${activeAddressFrom.coordinates.lat}&lon=${activeAddressFrom.coordinates.lon}`;

  console.log("coooords: ", coordinatesFrom);

  const [toCoordinates, setToCoordinates] = useState<any>({});

  const [suggestionsForTo, setSuggestionsForTo] = useState<Array<any>>([]);
  const [suggestionsForFrom, setSuggestionsForFrom] = useState<Array<any>>([]);
  const [carClass, setCarClass] = useState("");

  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [showSelectHubTo, setShowSelectHubTo] = useState(false);
  const [showCarClassSelect, setShowCarClassSelect] = useState(false);

  const [additionalRacesValue, setAdditionalRacesValue] = useState("");

  const dispatch = useAppDispatch();

  const items = [
    {
      title: "Уникальный адрес",
    },
    {
      title: "Хаб",
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleSuggestionFromClick = (suggestion: any) => {
    setShowSelect(false);
    dispatch(
      setActiveAddressFrom({
        address: suggestion.value,
        coordinates: {
          lat: suggestion.data["geo_lat"],
          lon: suggestion.data["geo_lon"],
        },
      })
    );
  };

  const handleSuggestionToClick = (suggestion: any) => {
    dispatch(
      setActiveAddressTo({
        address: suggestion.value,
        coordinates: {
          lat: suggestion.data["geo_lat"],
          lon: suggestion.data["geo_lon"],
        },
      })
    );
  };

  const suggestions = useAppSelector((state) => state.zone.suggestions);
  console.log(suggestions);

  const handleAdditionalRaceClick = (suggestion: any) => {
    dispatch(
      addAdditionalRace({
        id: nanoid(),
        value: suggestion.value,
        coordinates: suggestion.coordinates,
      })
    );
    setAdditionalRacesValue("");
  };

  const regionInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    regionInputChanged(e.target.value);
  };

  const cityInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    cityInputChanged(e.target.value);
  };

  const regionInputValue = useUnit($regionInputValue);
  const cityInputValue = useUnit($cityInputValue);

  const regionSuggestions = useUnit($regionSuggestions);
  const citySuggestions = useUnit($citySuggestions);

  const activeRegion = useUnit($activeRegion);
  const activeCity = useUnit($activeCity);

  const coordinatesTo = activeHubTo.id
    ? `&lat=${activeHubTo.coordinate.latitude}&lon=${activeHubTo.coordinate.longitude}`
    : `&lat=${activeAddressTo.coordinates.lat}&lon=${activeAddressTo.coordinates.lon}`;

  const showRoutes =
    coordinatesTo.indexOf("null") === -1 &&
    coordinatesFrom.indexOf("null") === -1;

  const iframeCoords: string = additionalRaces
    .map((item: IAdditionalRace) => {
      if (item.coordinates.length !== 0) {
        return `&lat=${item.coordinates[0]}&lon=${item.coordinates[1]}`;
      }
    })
    .join("");

  return (
    <div className={styles.mainWrap}>
      <div className={styles.transferCalculatorWrap}>
        <div className="destination-selection calculator-inputs">
          <div className="from-calculator">
            <Select
              setShowSelect={setShowSelect}
              showSelect={showSelect}
              setSelectItem={setSelectActiveItem}
              items={items}
              text={addressFromType || items[0].title}
            />
            {addressFromType === "Хаб" ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 10 }}>Откуда</div>
                <Select
                  setShowSelect={setShowSelectHubFrom}
                  showSelect={showSelectHubFrom}
                  items={filteredHubs}
                  text={
                    activeHubFrom.title || "Выберите хаб" || "Хабы отсутствуют"
                  }
                  haveButton={true}
                  secondCallback={(item) => {
                    dispatch(setActiveFromHub(item));
                  }}
                />
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                Откуда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Откуда"
                  value={activeAddressFrom.address}
                  onChange={async (e) => {
                    dispatch(
                      setActiveAddressFrom({
                        address: e.target.value,
                        coordinates: {
                          lat: null,
                          lon: null,
                        },
                      })
                    );
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
              </div>
            )}
            {activeAddressFrom.address.length !== 0 &&
              !activeAddressFrom.coordinates.lat && (
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
          <img
            src={rightArrow}
            alt=""
            onClick={() => {
              notification["success"]({
                message: "Notification Title",
                description:
                  "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
              });
            }}
          />
          <div className="to-calculator">
            <Select
              setShowSelect={setShowSecondSelect}
              showSelect={showSecondSelect}
              setSelectItem={setSecondSelectActiveItem}
              items={items}
              text={addressToType || items[0].title}
            />

            {addressToType === "Хаб" ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 10 }}>Куда</div>
                <Select
                  setShowSelect={setShowSelectHubTo}
                  showSelect={showSelectHubTo}
                  items={filteredHubs}
                  text={
                    activeHubTo.title || "Выберите хаб" || "Хабы отсутствуют"
                  }
                  haveButton={true}
                  secondCallback={(item) => {
                    dispatch(setActiveToHub(item));
                  }}
                />
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                Куда
                <input
                  type="text"
                  className="tariff-data-input"
                  placeholder="Куда"
                  onChange={async (e) => {
                    dispatch(
                      setActiveAddressTo({
                        address: e.target.value,
                        coordinates: {
                          lat: null,
                          lon: null,
                        },
                      })
                    );

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
                  value={activeAddressTo.address}
                />
              </div>
            )}
            {activeAddressTo.address.length !== 0 &&
              !activeAddressTo.coordinates.lat && (
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
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="tariff-data-input"
                style={{ width: "100%" }}
                placeholder="Откуда"
                value={additionalRacesValue}
                onChange={(e) => {
                  console.log(e.target.value);
                  setAdditionalRacesValue(e.target.value);
                  dispatch(getSuggestions(e.target.value));
                }}
              />
              {additionalRacesValue.length !== 0 && (
                <div className={styles.citySelect}>
                  <ul>
                    {suggestions.map((suggestion: any, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            handleAdditionalRaceClick(suggestion);
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
            {additionalRaces.map((additionalRace: IAdditionalRace) => (
              <AdditionalRace
                value={additionalRace.value}
                id={additionalRace.id}
              />
            ))}
          </div>
          <div className={"select-car-class"}>
            <div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: "red" }}>*</span>Выберите класс авто
              </div>
              <Select
                setShowSelect={setShowCarClassSelect}
                showSelect={showCarClassSelect}
                items={carsClasses}
                setSelectItem={setCarClass}
                //@ts-ignore
                text={carClass || carsClasses[0].title}
              />
            </div>
            {(activeAddressFrom.address || activeAddressTo.address) && (
              <div className="calculator-calc-button">
                <Button
                  text="Редактировать адреса"
                  width={350}
                  callback={() => setShowModal(true)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="route-info">
          <div className="left-route-info">
            <div>Расстояние: 421км</div>
            <div>Время: 7ч 9мин</div>
          </div>
          <div className="right-route-info">
            <div>Рекомендуемая стоимость:</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginRight: 30 }}>
                Заказчик: <span>15 000</span>
              </div>

              <div>
                Водитель: <span>10 000</span>
              </div>
            </div>
          </div>
        </div>
        {showRoutes && (
          <div>
            <div className={styles.iframeWrap}>
              <iframe
                src={`${API}/map/route/?region=${activeRegion}&city=${activeCity}${coordinatesFrom}${
                  additionalRaces.length !== 0 && iframeCoords
                }${coordinatesTo}`}
                width="100%"
                height={480}
                frameBorder="none"
              ></iframe>
            </div>
          </div>
        )}
      </div>

      <Modal active={showModal} setActive={setShowModal}>
        <EditAddress />
      </Modal>
    </div>
  );
};

export default Routes;
