import "./AddIntercityTariff.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isBooleanObject } from "util/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  setActiveCity,
  setShowAddCity,
} from "../../store/tariffSlice";
import { CarClass } from "../../types/types";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import Modal from "../modal/Modal";
import TariffCell from "../tariffCell/TariffCell";
import Button from "../ui/button/Button";

const CityPricesTable = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   return () => {
  //     dispatch(editTariffPriceThunk(getValues()));
  //   };
  // }, []);

  const onSubmit = (data: any) => {
    dispatch(editTariffPriceThunk(data));
  };

  const carClasses = useAppSelector((state) => state.tariff.carClasses);
  const cities = useAppSelector(
    (state) => state.tariff.activeTariff?.intercity_tariff.cities
  );
  const activeCity = useAppSelector((state) => state.tariff.activeCity);
  const activeTariff = useAppSelector((state) => state.tariff.activeTariff);

  // const setShowAddCitySidebar = () => {
  //   dispatch(setShowAddCity());
  // };

  // const [showModal, setShowModal] = useState(true);

  const setShowModal = () => {
    dispatch(setActiveCity(null));
  };
  if (cities && cities?.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
        Межгородские направления отсутствуют
      </div>
    );

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex-conteiner-table"
      >
        <div>
          <div
            style={{ cursor: "pointer", height: 60, width: 190 }}
            className="fixed-cell-tr overlap"
          >
            Тип услуг
          </div>
          {cities?.map((city) => (
            <div
              className="fixed-cell-tr"
              style={{ cursor: "pointer", height: 91, width: 190 }}
              onClick={() => dispatch(setActiveCity(city))}
            >
              {activeTariff?.city?.city} - {city.city.city}
            </div>
          ))}
        </div>
        <div className={"scroll-table-tariff overlap"}>
          <table>
            <thead>
              <tr>
                {carClasses.map((car: CarClass) => (
                  <th>{car.title}</th>
                ))}
              </tr>
            </thead>
          </table>
          <div>
            <table>
              <tbody className="fixed-conteiner">
                {cities?.map((city) => (
                  <tr>
                    {/* //   <td
                  //     className="fixed-cell-tr"
                  //     style={{ cursor: "pointer" }}
                  //     onClick={() => dispatch(setActiveCity(city))}
                  //   >
                  //     {city.city.city}
                  //   </td>
                  //   <td></td> */}
                    {city.prices.map((price) => (
                      <TariffCell
                        register={register}
                        id={price.id}
                        driverPrice={price.driver_price}
                        customerPrice={price.customer_price}
                        setValue={setValue}
                        errors={errors}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons firstTitle="Удалить тариф" />
        </div>
      </form>
      {activeCity && (
        <Modal active={Boolean(activeCity)} setActive={setShowModal}>
          <div>
            <div>
              Трансфер: {activeTariff?.city.city} - {activeCity.city.city}
            </div>
            <div>Расстояние: {activeCity.distance} км</div>
            <div>
              Длительность: {activeCity.hours_duration} ч.{" "}
              {activeCity.minutes_duration} мин
            </div>
          </div>
          <div>
            <Button
              text={"Удалить межгородское направление"}
              style={{
                marginTop: 20,
                fontSize: 14,
                paddingLeft: 30,
                paddingRight: 30,
                backgroundColor: "#DB5454",
              }}
              callback={() => {
                dispatch(setActiveCity(null));
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default CityPricesTable;
