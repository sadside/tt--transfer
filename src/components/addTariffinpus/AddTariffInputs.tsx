import "./addTarifinputs.scss";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCitySuggestionsThunk,
  getRegionSuggestionsThunk,
} from "../../store/tariffSlice";

export interface AddTariffInputsProps {
  intercity: boolean;
}

const AddTariffInputs: React.FC<AddTariffInputsProps> = ({ intercity }) => {
  const dispatch = useAppDispatch();

  const regionSuggestions = useAppSelector(
    (state) => state.tariff.regionSuggestions
  );

  const citySuggestions = useAppSelector(
    (state) => state.tariff.citySuggestions
  );

  const [region, setRegion] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const regionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
    dispatch(getRegionSuggestionsThunk(e.target.value));
  };

  const cityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    dispatch(getCitySuggestionsThunk(e.target.value));
  };

  console.log(regionSuggestions);
  console.log(citySuggestions);

  return (
    <div className="tariffs-edit-sidebar-content-inputs">
      <div className="tariff-data">
        <label>
          <span className="required">*</span>Название тарифа
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
            value={region}
            onChange={regionInputHandler}
          />
        </label>
        <label>
          <span className="required">*</span>Регион
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
            value={city}
            onChange={cityInputHandler}
          />
        </label>

        {!intercity && (
          <label>
            <span className="required">*</span>Город
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Введите название"
            />
          </label>
        )}
      </div>
      <div className="tariff-comment">
        <label>
          Комментарии
          <textarea name="" id="" placeholder="Введите текст"></textarea>
        </label>
      </div>
    </div>
  );
};

export default AddTariffInputs;
