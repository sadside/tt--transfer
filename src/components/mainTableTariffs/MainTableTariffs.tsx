import { stat } from "fs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearTariff,
  getShortTariffs,
  getTariffByIdThunk,
  setShowEditTariffSidebar,
} from "../../store/tariffSlice";
import Loader from "../loader/Loader";
import s from "./mainTableTariffs.module.scss";
import { FC, useEffect } from "react";

export type MainTableTariffsProps = {};

const MainTableTariffs: FC<MainTableTariffsProps> = ({}) => {
  const dispatch = useAppDispatch();

  const itemsHeader = [
    "Название",
    "Город",
    "Активный",
    "Время жизни",
    "Изменен",
    "Комиссионный",
  ];
  const tariffs = useAppSelector((state) => state?.tariff?.tariffs?.results);
  const status = useAppSelector((state) => state.tariff.status);

  return (
    <div className={s.scrollTable}>
      <table className={s.scrollTableHead}>
        <thead>
          <tr>
            {itemsHeader.map((item, index) => (
              <th className={s.item} key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <div className={s.scrollTableBody}>
        <table>
          <tbody>
            {tariffs?.map((tariff) => (
              <tr className={s.trBodyTable} key={tariff.id}>
                <td
                  className={[s.item, s.firstItem].join(" ")}
                  onClick={() => dispatch(getTariffByIdThunk(tariff.id))}
                >
                  {tariff.title}
                </td>
                <td className={s.item}>{tariff.city.city}</td>
                <td className={s.item}>Да</td>
                <td className={s.item}>7 дней</td>
                <td className={s.item}>7 дней назад</td>
                <td className={s.item}>{tariff.commission ? "Да" : "Нет"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTableTariffs;
