import "./transferEditSidebarTable.scss";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editTariffPriceThunk } from "../../store/tariffSlice";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import TariffCellHubs from "../tariffCellHubs/TariffCellHubs";

const HubsZonesTable = () => {
  const activeHub = useAppSelector((state) => state.tariff.activeHub);
  const carsClasses = useAppSelector((state) => state.tariff.carClasses);

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

  // useEffect(() => {
  //   return () => {
  //     dispatch(editTariffPriceThunk(getValues()));
  //   };
  // }, []);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="scroll-table-tariff ">
        <div className="scroll-table-body-tariff">
          <table>
            <thead>
              <tr>
                <th>Класс авто</th>
                {activeHub?.additional_hubzone_prices.map((zone) => (
                  <th
                    className={`region transfer-link ${zone.zone.color}-zone`}
                  >
                    <div>{zone.zone.title}</div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <table>
            {activeHub && activeHub.additional_hubzone_prices.length > 0 ? (
              <tbody>
                {carsClasses.map((car, idx) => (
                  <tr>
                    <td>{car.title}</td>
                    {activeHub?.additional_hubzone_prices?.map(
                      (zone, index) => (
                        <TariffCellHubs
                          register={register}
                          errors={errors}
                          customerPrice={
                            activeHub?.additional_hubzone_prices[index].prices[
                              idx
                            ].customer_price
                          }
                          driverPrice={
                            activeHub?.additional_hubzone_prices[index].prices[
                              idx
                            ].driver_price
                          }
                          id={
                            activeHub?.additional_hubzone_prices[index].prices[
                              idx
                            ].id
                          }
                          setValue={setValue}
                        />
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            ) : (
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
                У хаба <strong>{activeHub?.hub?.title}</strong> отсутствуют зоны
              </div>
            )}
          </table>
        </div>
      </div>
      <div className="submit-buttons-wrap">
        <EditSidebarSubmitButtons firstTitle="Удалить тариф" />
      </div>
    </form>
  );
};

export default HubsZonesTable;
