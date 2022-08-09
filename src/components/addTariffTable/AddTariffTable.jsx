import "./addTariffTable.scss";
import { useForm } from "react-hook-form";
import { tariffSidebarTableBody } from "../../db";

const AddTariffTable = ({ showTransfersSidebar }) => {
  const { register, handleSubmit, setValue } = useForm();

  setValue("timeRentClientStandard", "800");
  setValue("timeRentDriverStandard", "600");
  setValue("timeRentClientBusiness", "800");
  setValue("timeRentDriverBusiness", "600");
  setValue("timeRentClientExecutive", "800");
  setValue("timeRentDriverExecutive", "600");
  setValue("timeRentClientMinivan", "800");
  setValue("timeRentDriverMinivan", "600");

  setValue("distanceRentClientStandard", "800");
  setValue("distanceRentDriverStandard", "600");
  setValue("distanceRentClientBusiness", "800");
  setValue("distanceRentDriverBusiness", "600");
  setValue("distanceRentClientExecutive", "800");
  setValue("distanceRentDriverExecutive", "600");
  setValue("distanceRentClientMinivan", "800");
  setValue("distanceRentDriverMinivan", "600");

  setValue("additionalRacesClientStandard", "800");
  setValue("additionalRacesDriverStandard", "600");
  setValue("additionalRacesClientBusiness", "800");
  setValue("additionalRacesDriverBusiness", "600");
  setValue("additionalRacesClientExecutive", "800");
  setValue("additionalRacesDriverExecutive", "600");
  setValue("additionalRacesClientMinivan", "800");
  setValue("additionalRacesDriverMinivan", "600");

  setValue("minOrderClientStandard", "800");
  setValue("minOrderDriverStandard", "600");
  setValue("minOrderClientBusiness", "800");
  setValue("minOrderDriverBusiness", "600");
  setValue("minOrderClientExecutive", "800");
  setValue("minOrderDriverExecutive", "600");
  setValue("minOrderClientMinivan", "800");
  setValue("minOrderDriverMinivan", "600");

  setValue("waitingClientStandard", "800");
  setValue("waitingDriverStandard", "600");
  setValue("waitingClientBusiness", "800");
  setValue("waitingDriverBusiness", "600");
  setValue("waitingClientExecutive", "800");
  setValue("waitingDriverExecutive", "600");
  setValue("waitingClientMinivan", "800");
  setValue("waitingDriverMinivan", "600");

  return (
    <>
      <div className="scroll-table-tariff">
        <table>
          <thead>
            <tr>
              <th height="60">Типы услуг</th>
              <th height="60">Стандарт</th>
              <th height="60">Бизнес</th>
              <th height="60">Представительский</th>
              <th height="60">Минивен</th>
            </tr>
          </thead>
        </table>
        <div className="scroll-table-body-tariff">
          <table>
            <tbody>
              {/*Аренда по времени*/}
              {tariffSidebarTableBody.map((row) => (
                <tr>
                  <td>{row.title}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameClientStandard)}
                        />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameDriverStandard)}
                        />
                        <div>Водитель</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameClientBusiness)}
                        />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameDriverBusiness)}
                        />
                        <div>Водитель</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameClientExecutive)}
                        />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameDriverExecutive)}
                        />
                        <div>Водитель</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameClientMinivan)}
                        />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input
                          type="text"
                          className={"tariff-price-input"}
                          {...register(row.nameDriverMinivan)}
                        />
                        <div>Водитель</div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  onClick={() => showTransfersSidebar(true)}
                  className={"region transferLink"}
                >
                  <div className={"transferLink-item"}>Трансферы (руб.)</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <div>Оренбург</div>
                  <div>Оренбург, вокзал</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <div>Оренбург</div>
                  <div>Оренбург, вокзал</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddTariffTable;
