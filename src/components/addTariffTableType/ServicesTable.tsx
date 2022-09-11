import "./addTariffTableType.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  getCarClassesThunk,
} from "../../store/tariffSlice";
import Loader from "../loader/Loader";
import TariffCell from "../tariffCell/TariffCell";

const ServicesTable = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.tariff.status);
  const carClasses = useAppSelector((state) => state.tariff.carClasses);
  const tariff = useAppSelector((state) => state.tariff.activeTariff);

  useEffect(() => {
    if (carClasses.length === 0) dispatch(getCarClassesThunk());
  }, []);

  const onSubmit = (data: any) => {
    dispatch(editTariffPriceThunk(data));
  };

  if (status === "loading")
    return (
      <div style={{ marginTop: 40 }}>
        <Loader />
      </div>
    );

  return (
    <>
      <div className="scroll-table-tariff">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="scroll-table-body-tariff">
            <table>
              <thead>
                <tr>
                  <th>Типы услуг</th>
                  {carClasses.map((carClass) => (
                    <th>{carClass.title}</th>
                  ))}
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                {tariff?.services?.map((service) => (
                  <tr>
                    <td>{service.title}</td>
                    {service?.prices?.map((price) => {
                      return (
                        <TariffCell
                          register={register}
                          id={price.id}
                          driverPrice={price.driver_price}
                          customerPrice={price.customer_price}
                          setValue={setValue}
                          errors={errors}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default ServicesTable;
