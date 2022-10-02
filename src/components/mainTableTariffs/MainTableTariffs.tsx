import { stat } from "fs";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "moment/locale/ru";
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
    "Тип",
  ];
  const tariffs = useAppSelector((state) => state?.tariff?.tariffs?.results);
  const status = useAppSelector((state) => state.tariff.status);

  moment.locale("ru");

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
                <td className={s.item}>{tariff.is_available ? "Да" : "Нет"}</td>
                <td
                  className={s.item}
                  style={
                    moment().isAfter(tariff.lifetime) ? { color: "red" } : {}
                  }
                >
                  {moment().isAfter(tariff.lifetime)
                    ? "Срок истек"
                    : `Срок истекает ${moment().to(tariff.lifetime)}`}
                </td>
                <td className={s.item}>
                  {moment(tariff.last_update).fromNow()}
                </td>
                <td className={s.item}>
                  {tariff.type === "commission" ? "Комиссионный" : "Основной"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTableTariffs;
