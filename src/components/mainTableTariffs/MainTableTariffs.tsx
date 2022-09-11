import { stat } from "fs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearTariff,
  getShortTariffs,
  getTariffByIdThunk,
  setShowEditTariffSidebar,
} from "../../store/tariffSlice";
import s from "./mainTableTariffs.module.scss";
import { FC, useEffect } from "react";

export type MainTableTariffsProps = {};

const MainTableTariffs: FC<MainTableTariffsProps> = ({}) => {
  const dispatch = useAppDispatch();

  const itemsHeader = [
    "Город",
    "Название",
    "Активный",
    "Время жизни",
    "Изменен",
    "Комиссионный",
  ];
  const tariffs = useAppSelector((state) => state.tariff.tariffs);

  return (
    <div className={s.scrollTable}>
      <table className={s.scrollTableHead}>
        <thead>
          <tr>
            {itemsHeader.map((item) => (
              <th className={s.item}>{item}</th>
            ))}
          </tr>
        </thead>
      </table>

      <div className={s.scrollTableBody}>
        <table>
          <tbody>
            {tariffs
              ?.map((tariff) => (
                <tr className={s.trBodyTable}>
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
                  <td className={s.item}>
                    {tariff.is_commission ? "Да" : "Нет"}
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTableTariffs;
