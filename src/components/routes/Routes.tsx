import axios from "axios";
import { FC, useState } from "react";
import { carClasses } from "../../db";
import {
  setActiveAddressFrom,
  setActiveFromHub,
  setActiveHub,
  setActiveToHub,
  setAddressFromType,
  setShowModal,
} from "../../store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IFullHub } from "../../types/types";
import Select from "../select/Select";
import Button from "../ui/button/Button";
import styles from "./Routes.module.scss";
import rightArrow from "../../assets/rightArrow.svg";

const Routes: FC = () => {
  const activeRegion = useAppSelector((state) => state.calculator.activeRegion);
  const activeCity = useAppSelector((state) => state.calculator.activeCity);
  const activeHub = useAppSelector((state) => state.calculator.activeHub);
  const hubs = useAppSelector((state) => state.calculator.hubs);
  const activeHubTo = useAppSelector((state) => state.calculator.activeToHub);

  const [showSelect, setShowSelect] = useState(false);
  const [showSelectHubFrom, setShowSelectHubFrom] = useState(false);
  // const [selectActiveItem, setSelectActiveItem] = useState("");

  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");
  const [additionalRaces, setAdditionalRaces] = useState<any[]>([
    {
      state: "",
      suggestions: [],
      coordinates: [],
    },
  ]);

  const addressFromType = useAppSelector(
    (state) => state.calculator.addressFromType
  );

  const setSelectActiveItem = (type: string) => {
    dispatch(setAddressFromType(type));
  };

  const activeHubFrom = useAppSelector(
    (state) => state.calculator.activeFromHub
  );

  const filteredHubs = hubs.filter((hub: IFullHub) => {
    return hub.id !== activeHubTo.id && hub.id !== activeHubFrom.id;
  });
  const [fromCoordinates, setFromCoordinates] = useState<any>({});

  const coordinatesFrom = activeHubFrom.id
    ? `&lat=${activeHubFrom.coordinate.latitude}&lon=${activeHubFrom.coordinate.longitude}`
    : `&lat=${fromCoordinates.lat}&lon=${fromCoordinates.lon}`;

  console.log("coooords: ", coordinatesFrom);

  const [toCoordinates, setToCoordinates] = useState<any>({});
  const [state, setState] = useState(0);

  const [suggestionsForTo, setSuggestionsForTo] = useState<Array<any>>([]);
  const [suggestionsForFrom, setSuggestionsForFrom] = useState<Array<any>>([]);
  const [carClass, setCarClass] = useState("");

  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const [selectSecondActiveItem, setSecondSelectActiveItem] = useState("");
  const [showSelectHubTo, setShowSelectHubTo] = useState(false);
  const [showCarClassSelect, setShowCarClassSelect] = useState(false);

  const dispatch = useAppDispatch();

  const items = [
    {
      title: "Уникальный адрес",
    },
    {
      title: "Хаб",
    },
  ];
  const setModalActive = (bool: boolean) => {
    dispatch(setShowModal(bool));
  };

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

  const [showRotes, setShowRoutes] = useState(false);

  const handleAdditionalRaceClick = (suggestion: any, input: any) => {
    input.state = suggestion.value;
    input.coordinates = [
      suggestion.data["geo_lat"],
      suggestion.data["geo_lon"],
    ];
  };
  const coordinatesTo = activeHubTo.id
    ? `&lat=${activeHubTo.coordinate.latitude}&lon=${activeHubTo.coordinate.longitude}`
    : `&lat=${toCoordinates.lat}&lon=${toCoordinates.lon}`;

  const iframeCoords: string = additionalRaces
    .map((item) => {
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
              </div>
            )}
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
            <Select
              setShowSelect={setShowSecondSelect}
              showSelect={showSecondSelect}
              setSelectItem={setSecondSelectActiveItem}
              items={items}
              text={selectSecondActiveItem || items[0].title}
            />

            {selectSecondActiveItem === "Хаб" ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 10 }}>Куда</div>
                <Select
                  setShowSelect={setShowSelectHubTo}
                  showSelect={showSelectHubTo}
                  items={hubs}
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
              </div>
            )}
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
                  {item.state.length !== 0 && item.coordinates.length === 0 && (
                    <div className={styles.citySelect}>
                      <ul>
                        {item.suggestions.map(
                          (suggestion: any, index: number) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  handleAdditionalRaceClick(suggestion, item);
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
          <div className={"select-car-class"}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: "red" }}>*</span>Выберите класс авто
            </div>
            <Select
              setShowSelect={setShowCarClassSelect}
              showSelect={showCarClassSelect}
              items={carClasses}
              setSelectItem={setCarClass}
              text={carClass || carClasses[0].title}
            />
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
            callback={() => {
              setShowRoutes(true);
            }}
          />
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
        <div>
          <div className={styles.iframeWrap}>
            <iframe
              src={`http://localhost:8000/map/route/?region=${
                activeRegion?.name
              }&city=${activeCity?.name}${coordinatesFrom}${
                additionalRaces.length !== 0 && iframeCoords
              }${coordinatesTo}`}
              width="100%"
              height={480}
              frameBorder="none"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routes;
