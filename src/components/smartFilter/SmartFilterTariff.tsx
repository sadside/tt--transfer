import { useGate, useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import downArrowSelect from "../../assets/downArrow.svg";
import {
  $activeCity,
  $activeRegion,
  $cityInputValue,
  $citySuggestions,
  $regionInputValue,
  $regionSuggestions,
  cityInputChanged,
  citySuggestionClicked,
  regionInputChanged,
  regionSuggestionClicked,
  smartFilter,
} from "../../effector/tariffs/addresses/smartFilterAddress";
import {
  $tariffActive,
  $tariffCommission,
  $tariffType,
  activeSelectChanged,
  selectChanged,
} from "../../effector/tariffs/smartFilter/tariffSmartFilter";
import useOutside from "../../hooks/useOutside";
import { useAppDispatch } from "../../store/hooks";
import { getShortTariffs } from "../../store/tariffSlice";
import CustomSelect from "../customSelect/CustomSelect";
import Button from "../ui/button/Button";
import "./smartFilter.scss";
import styles from "./SmartFilterTariff.module.scss";

interface SmartFilterTariffProps {
  filterData?: any[];
  closeSmartFilter: () => void;
}

const SmartFilterTariff = ({
  filterData,
  closeSmartFilter,
}: SmartFilterTariffProps) => {
  useGate(smartFilter);

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isShow: isShowType,
    ref: refType,
    setIsShow: setIsShowType,
  } = useOutside(false);

  const {
    isShow: isShowActive,
    ref: refActive,
    setIsShow: setIsShowActive,
  } = useOutside(false);

  const selectItemsType = ["Все", "Основной", "Комиссионный"];
  const selectItemsActive = ["Все", "Активный", "Неактивный"];

  const regionInputValue = useUnit($regionInputValue);
  const cityInputValue = useUnit($cityInputValue);

  const regionSuggestions = useUnit($regionSuggestions);
  const citySuggestions = useUnit($citySuggestions);

  const activeRegion = useUnit($activeRegion);
  const activeCity = useUnit($activeCity);

  //select type
  const tariffType = useUnit($tariffType);
  const tariffActive = useUnit($tariffActive);
  const tariffCommission = useUnit($tariffCommission);

  const regionInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    regionInputChanged(e.target.value);
  };

  const cityInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    cityInputChanged(e.target.value);
  };

  const selectTypeHandler = (type: string): void => {
    selectChanged(type);
  };

  const selectActiveHandler = (type: string): void => {
    activeSelectChanged(type);
  };

  const dispatch = useAppDispatch();

  let tariffActiveType = "";

  switch (tariffActive) {
    case "Все":
      tariffActiveType = "";
      break;
    case "Активный":
      tariffActiveType = "true";
      break;
    case "Неактивный":
      tariffActiveType = "false";
      break;
  }

  const filterTariffs = () => {
    setSearchParams({
      region: activeRegion,
      type: tariffType,
      city: activeCity,
      isActive: tariffActiveType,
    });
    dispatch(getShortTariffs(true));
    closeSmartFilter();
  };

  return (
    <div className="smart-filter-wrap-1">
      <div className={"smart-filter-wrap"}>
        <label>
          <span className="required">*</span>Регион
          <input
            type="text"
            className={styles.tariffDataInput}
            placeholder="Введите регион"
            value={regionInputValue}
            onChange={regionInputHandler}
          />
          <AnimatePresence>
            {regionSuggestions.length > 0 && !activeRegion && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ zIndex: 100000000, position: "relative", width: 300 }}
              >
                <div className={styles.citySelect}>
                  <ul>
                    {regionSuggestions.map((region, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            regionSuggestionClicked(region);
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
            className={styles.tariffDataInput}
            placeholder={
              activeRegion ? "Введите город" : "Сначала введите регион"
            }
            onChange={cityInputHandler}
            value={cityInputValue}
            disabled={!activeRegion}
          />
          <AnimatePresence>
            {citySuggestions?.length > 0 && !activeCity && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "Tween" }}
                style={{ zIndex: 100, position: "relative", width: 300 }}
              >
                <div className={styles.citySelect}>
                  <ul>
                    {citySuggestions.map((city, index: number) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            citySuggestionClicked(city);
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
          <div className={styles.smartFilterSelectCurrency} ref={refType}>
            <div>
              <div style={{ color: "#000" }}>
                <span className="required">*</span>Тип
              </div>
              <div
                className="tariff-data-select"
                onClick={() => setIsShowType(!isShowType)}
              >
                <div>{tariffType}</div>
                <img src={downArrowSelect} alt="" />
              </div>
            </div>
            <CustomSelect
              items={selectItemsType}
              isVisible={isShowType}
              setItem={selectTypeHandler}
              setVisible={setIsShowType}
              showAll={false}
            />
          </div>
        </label>
        {tariffType === "Для компаний" && (
          <label>
            <span className="required">*</span>Компания
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Введите компанию"
            />
          </label>
        )}
        {/*<div style={{ marginTop: 20, marginLeft: 40 }}>*/}
        {/*  {tariffType === "Комиссионный" && (*/}
        {/*    <label>*/}
        {/*      <span className="required">*</span>Процент*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        className="tariff-data-input"*/}
        {/*        placeholder="Введите процент"*/}
        {/*        value={tariffCommission}*/}
        {/*        onChange={(e: ChangeEvent<HTMLInputElement>) => {*/}
        {/*          commissionInputChanged(e.target.value);*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </label>*/}
        {/*  )}*/}
        {/*</div>*/}

        <label>
          <div className={styles.smartFilterSelectCurrency} ref={refActive}>
            <div>
              <div>
                <span className="required">*</span>Активный
              </div>
              <div
                className="tariff-data-select"
                onClick={() => setIsShowActive(!isShowActive)}
              >
                <div>{tariffActive}</div>
                <img src={downArrowSelect} alt="" />
              </div>
            </div>
            <CustomSelect
              items={selectItemsActive}
              isVisible={isShowActive}
              setItem={selectActiveHandler}
              setVisible={setIsShowActive}
              showAll={false}
            />
          </div>
        </label>
      </div>

      <div className="filter-button-wrap">
        <Button
          text="Найти"
          style={{ width: 160, marginBottom: 20, marginRight: 20 }}
          callback={filterTariffs}
        />
        <Button
          text="Закрыть"
          style={{ width: 160, marginBottom: 20, backgroundColor: "#364150" }}
          callback={closeSmartFilter}
        />
      </div>
    </div>
  );
};

export default SmartFilterTariff;
