import { stat } from "fs";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "moment/locale/ru";
import {
  clearTariff,
  getShortTariffs,
  getTariffByIdThunk,
  setCheckedState,
  setIsSelectAll,
  setShowEditTariffSidebar,
  updateCheckedState,
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
    "Действует до",
    "Изменен",
    "Тип",
  ];
  const tariffs = useAppSelector((state) => state?.tariff?.tariffs?.results);
  const status = useAppSelector((state) => state.tariff.status);
  const checkedState = useAppSelector((state) => state.tariff.checkedState);
  const isSelectAll = useAppSelector((state) => state.tariff.isSelectAll);

  const selectAll = () => {
    if (checkedState.includes(false)) {
      dispatch(setCheckedState(true));
      dispatch(setIsSelectAll(true));
      // setCheckedState(new Array(body.length).fill(true));
      // setIsSelectAll(true);
    } else {
      dispatch(setCheckedState(false));
      dispatch(setIsSelectAll(false));

      // setCheckedState(new Array(body.length).fill(false));
      // setIsSelectAll(false);
    }
  };

  moment.locale("ru");

  return (
    <table>
      <div className={s.scrollTable}>
        <table className={s.scrollTableHead}>
          <thead>
            <tr>
              <th className={s.checkbox}>
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={isSelectAll}
                />
              </th>
              {itemsHeader.map((item, index) => (
                <th className={s.item} key={index} align={"center"}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        <div className={s.scrollTableBody}>
          <table>
            <tbody>
              {tariffs?.map((tariff, index) => (
                <tr className={s.trBodyTable} key={tariff.id}>
                  <td className={s.checkbox} align={"center"} width="10%">
                    <input
                      type="checkbox"
                      onChange={() => dispatch(updateCheckedState(index))}
                      checked={checkedState[index]}
                    />
                  </td>

                  <td
                    className={[s.item, s.firstItem].join(" ")}
                    onClick={() => dispatch(getTariffByIdThunk(tariff.id))}
                    align={"center"}
                  >
                    {tariff.title}
                  </td>
                  <td className={s.item} align={"center"}>
                    {tariff.city.city}
                  </td>
                  <td className={s.item} align={"center"}>
                    {tariff.is_available ? "Да" : "Нет"}
                  </td>
                  <td className={s.item} align={"center"}>
                    {/*{moment().isAfter(tariff.lifetime)*/}
                    {/*  ? "Срок истек"*/}
                    {/*  : `Срок истекает ${moment().to(tariff.lifetime)}`}*/}
                    {tariff.lifetime.split("T")[0]}
                  </td>
                  <td className={s.item} align={"center"}>
                    {moment(tariff.last_update).fromNow()}
                  </td>
                  <td className={s.item} align={"center"}>
                    {tariff.type === "commission" ? "Комиссионный" : "Основной"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </table>
  );
};

export default MainTableTariffs;
