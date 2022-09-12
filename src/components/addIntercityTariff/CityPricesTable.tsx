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

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={"scroll-table-tariff overlap"}>
          <table>
            <thead>
              <tr>
                <th>Типы услуг</th>
                {carClasses.map((car: CarClass) => (
                  <th>{car.title}</th>
                ))}
              </tr>
            </thead>
          </table>
          <div>
            <table>
              <tbody>
                {cities?.map((city) => (
                  <tr>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(setActiveCity(city))}
                    >
                      {city.city.city}
                    </td>
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
            Трансфер: {activeTariff?.city.city} - {activeCity.city.city}
          </div>
          <div>Расстояние: {activeCity.distance} км</div>
          <div>
            Длительность: {activeCity.hours_duration} ч.{" "}
            {activeCity.minutes_duration} мин
          </div>
        </Modal>
      )}
    </>
  );
};

export default CityPricesTable;
