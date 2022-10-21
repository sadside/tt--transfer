import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Collapse } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

import {
  getCitySuggestionsThunk,
  getHubsThunk,
  getRegionsThunk,
  getRegionSuggestionsThunk,
  setActiveCity,
  setActiveRegion,
  setTariffCity,
} from "../../store/calculatorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Loader from "../loader/Loader";
import Suggestions from "../suggestions/Suggestions";
import { ZoningCity } from "../zoningCity/ZonningCity";
import { ZoningHub } from "../ZoningHub/ZoningHub";
import styles from "./Calculator.module.scss";
import "./calculator.scss";

export type HubFormValues = {
  name: string;
  description: string;
  coords: string;
};

const { Panel } = Collapse;

const Calculator = () => {
  const activeRegion = useAppSelector((state) => state.calculator.activeRegion);
  const activeCity = useAppSelector((state) => state.calculator.activeCity);
  const regions = useAppSelector((state) => state.calculator.regions);

  const regionSuggestions = useAppSelector(
    (state) => state.calculator.regionSuggestions
  );

  const citySuggestions = useAppSelector(
    (state) => state.calculator.citySuggestions
  );

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.calculator.loading);

  const [regionInputValue, setRegionInputValue] = useState("");
  const [cityInputValue, setCityInputValue] = useState("");

  useEffect(() => {
    if (regions.length === 0) dispatch(getRegionsThunk());
  }, []);

  if (loading) {
    return <Loader />;
  }

  const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionInputValue(e.target.value);
    setCityInputValue("");
    dispatch(setActiveRegion(null));
    dispatch(setActiveCity(null));
    dispatch(getRegionSuggestionsThunk(e.target.value));
  };

  const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInputValue(e.target.value);
    dispatch(setTariffCity(null));
    dispatch(getCitySuggestionsThunk(e.target.value));
  };

  const handleRegionSuggestionClick = (region: string) => {
    dispatch(setActiveRegion(region));
    console.log(region);
    setRegionInputValue(region);
    setCityInputValue("");
  };

  const handleCitySuggestionClick = (city: string) => {
    dispatch(setActiveCity(city));
    setCityInputValue(city);
    dispatch(
      getHubsThunk({
        region: activeRegion,
        city: city,
      })
    );
  };

  return (
    <>
      <div className="calculator-wrap">
        <div className={styles.selectCity}>
          <label>Введите регион:</label>
          <div className={styles.citySelectWrap}>
            <input
              type="text"
              onChange={regionInputHandler}
              value={activeRegion || regionInputValue}
              placeholder={"Введите регион"}
            />

            <AnimatePresence>
              {regionSuggestions.length > 0 && !activeRegion && (
                <Suggestions
                  suggestions={regionSuggestions}
                  suggestionClicked={handleRegionSuggestionClick}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.selectCity}>
          <label>Введите город:</label>
          <div className={styles.citySelectWrap}>
            <input
              type="text"
              onChange={cityInputHandler}
              value={activeCity || cityInputValue}
              disabled={!activeRegion}
              placeholder={activeRegion ? "Введите город" : "Регион не указан"}
            />

            <AnimatePresence>
              {citySuggestions?.length > 0 && !activeCity && (
                <Suggestions
                  suggestions={citySuggestions}
                  suggestionClicked={handleCitySuggestionClick}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        {activeRegion && activeCity && (
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg={"brand.gray"}
                  height={50}
                  borderRadius={3}
                  border={"none"}
                  _hover={{
                    backgroundColor: "#E8E8E8",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    Зонирование города
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ZoningCity />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem mt={5}>
              <h2>
                <AccordionButton
                  bg={"brand.gray"}
                  height={50}
                  borderRadius={3}
                  border={"none"}
                  _hover={{
                    backgroundColor: "#E8E8E8",
                  }}
                >
                  <Box flex="1" textAlign="left">
                    Зонирование Хаба
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} minHeight={325}>
                <ZoningHub />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </>
  );
};

export default Calculator;
