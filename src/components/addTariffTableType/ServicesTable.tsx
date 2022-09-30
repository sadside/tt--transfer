import "./addTariffTableType.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  getCarClassesThunk,
} from "../../store/tariffSlice";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
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

    // return () => {
    //   dispatch(editTariffPriceThunk(getValues()));
    // };
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
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex-conteiner-table">
          <div>
            <div style={{ cursor: "pointer", height: 60, width: 190 }} className="fixed-cell-tr overlap">
              Тип услуг
            </div>
            {tariff?.services?.map((service) => (
              <div 
                className="fixed-cell-tr"
                style={{ height: 91, width: 190 }}>
                {service.title}
              </div>
            ))}
          </div>
          <div className="scroll-table-body-tariff">
            <table>
              <thead>
                <tr>
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
                    {/* <td className="fixed-cell">{service.title}</td>
                    <td></td> */}
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
          <div className="submit-buttons-wrap">
            <EditSidebarSubmitButtons firstTitle="Удалить тариф" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ServicesTable;
