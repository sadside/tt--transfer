import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  removeGlobalAddressRoute,
  setActiveGlobalAddressRoute,
} from "../../store/tariffSlice";
import { CarClass } from "../../types/types";
import "../addIntercityTariff/AddIntercityTariff.scss";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import Modal from "../modal/Modal";
import TariffCell from "../tariffCell/TariffCell";
import Button from "../ui/button/Button";

const GlobalAddressesTable = () => {
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
  const globalAddresses = useAppSelector(
    (state) => state.tariff?.activeTariff?.intercity_tariff?.global_addresses
  );
  const activeTariff = useAppSelector((state) => state.tariff.activeTariff);

  const activeGlobalAddressRoute = useAppSelector(
    (state) => state.tariff.activeGlobalAddressRoute
  );

  const setShowModal = () => {
    dispatch(setActiveGlobalAddressRoute(null));
  };

  if (globalAddresses && globalAddresses?.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
        Маршруты с глобальными адресами отсутствуют
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
          {globalAddresses?.map((globalAddress) => (
            <div
              className="fixed-cell-tr"
              style={{
                cursor: "pointer",
                height: 91,
                width: 190,
              }}
              onClick={() =>
                dispatch(setActiveGlobalAddressRoute(globalAddress))
              }
            >
              {activeTariff?.city?.city} -{" "}
              {globalAddress.global_address.address.slice(0, 20) + " ..."}
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
                {globalAddresses?.map((globalAddress) => (
                  <tr>
                    {globalAddress.prices.map((price) => (
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

      {activeGlobalAddressRoute && (
        <Modal
          active={Boolean(activeGlobalAddressRoute)}
          setActive={setShowModal}
        >
          <div>
            <div>
              Трансфер: {activeTariff?.city.city} -{" "}
              {activeGlobalAddressRoute.global_address.address}
            </div>
            <div>Расстояние: {activeGlobalAddressRoute.distance} км</div>
            <div>
              Длительность: {activeGlobalAddressRoute.hours_duration} ч.{" "}
              {activeGlobalAddressRoute.minutes_duration} мин
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
                dispatch(removeGlobalAddressRoute());
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default GlobalAddressesTable;
