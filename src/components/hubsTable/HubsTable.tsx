import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  removeHubRoute,
  setActiveHubRoute,
} from "../../store/tariffSlice";
import { CarClass } from "../../types/types";
import "../addIntercityTariff/AddIntercityTariff.scss";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import Modal from "../modal/Modal";
import TariffCell from "../tariffCell/TariffCell";
import Button from "../ui/button/Button";

const HubsTable = () => {
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

  const hubs = useAppSelector(
    (state) => state.tariff?.activeTariff?.intercity_tariff?.hubs
  );
  const activeTariff = useAppSelector((state) => state.tariff.activeTariff);

  const activeHubRoute = useAppSelector((state) => state.tariff.activeHubRoute);

  const setShowModal = () => {
    dispatch(setActiveHubRoute(null));
  };

  if (hubs && hubs?.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
        Маршруты с хабами отсутствуют
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
          {hubs?.map((hub) => (
            <div
              className="fixed-cell-tr"
              style={{ cursor: "pointer", height: 91, width: 190 }}
              onClick={() => dispatch(setActiveHubRoute(hub))}
            >
              {activeTariff?.city?.city} - {hub.hub.title}
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
                {hubs?.map((city) => (
                  <tr>
                    {city.prices.map((hub) => (
                      <TariffCell
                        register={register}
                        id={hub.id}
                        driverPrice={hub.driver_price}
                        customerPrice={hub.customer_price}
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

      {activeHubRoute && (
        <Modal active={Boolean(activeHubRoute)} setActive={setShowModal}>
          <div>
            <div>
              Трансфер: {activeTariff?.city.city} - {activeHubRoute.hub.title}
            </div>
            <div>Расстояние: {activeHubRoute.distance} км</div>
            <div>
              Длительность: {activeHubRoute.hours_duration} ч.{" "}
              {activeHubRoute.minutes_duration} мин
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
                dispatch(removeHubRoute());
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default HubsTable;
