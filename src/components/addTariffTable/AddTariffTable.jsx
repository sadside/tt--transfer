import "./addTariffTable.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  getCarClassesThunk,
} from "../../store/tariffSlice";
import Loader from "../loader/Loader";
import TariffCell from "../tariffCell/TariffCell";

const AddTariffTable = ({ showTransfersSidebar }) => {
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.tariff.status);
  const carClasses = useAppSelector((state) => state.tariff.carClasses);
  const tariff = useAppSelector((state) => state.tariff.tariff);

  useEffect(() => {
    if (carClasses.length === 0) dispatch(getCarClassesThunk());
  }, []);

  const onSubmit = (data) => {
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
                  <th height="60" width="190">
                    Типы услуг
                  </th>
                  {carClasses.map((carClass) => (
                    <th height="60" width="190">
                      {carClass.title}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <table>
              <tbody>
                {tariff?.services?.map((service) => (
                  <tr>
                    <td>{service.title}</td>
                    {service.prices.map((price) => {
                      return (
                        <TariffCell
                          register={register}
                          id={price.id}
                          driverPrice={price.driver_price}
                          customerPrice={price.customer_price}
                          setValue={setValue}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th height="60" width="190">
                    Хабы
                  </th>

                  {carClasses.map((carClass) => (
                    <th height="60" width="190">
                      {carClass.title}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>

            <table>
              <tbody>
                {tariff?.intracity_tariff?.hub_to_prices?.map((hub) => (
                  <tr>
                    <td
                      onClick={() => showTransfersSidebar(true)}
                      className={"region transferLink"}
                    >
                      <div className={"transferLink-item"}>
                        {hub?.hub?.title}
                      </div>
                    </td>
                    {hub.prices.map((price) => {
                      return (
                        <TariffCell
                          register={register}
                          id={price.id}
                          driverPrice={price.driver_price}
                          customerPrice={price.customer_price}
                          setValue={setValue}
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

export default AddTariffTable;
