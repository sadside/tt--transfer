import "./AddIntercityTariff.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editTariffPriceThunk, setShowAddCity } from "../../store/tariffSlice";
import { CarClass } from "../../types/types";
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

  const onSubmit = (data: any) => {
    dispatch(editTariffPriceThunk(data));
  };

  const carClasses = useAppSelector((state) => state.tariff.carClasses);
  const cities = useAppSelector(
    (state) => state.tariff.activeTariff?.intercity_tariff.cities
  );

  // const setShowAddCitySidebar = () => {
  //   dispatch(setShowAddCity());
  // };

  return (
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
                  <td style={{ cursor: "pointer" }}>{city.city.city}</td>
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
      <input type="submit" />
      {/*<Modal></Modal>*/}
    </form>
  );
};

export default CityPricesTable;
