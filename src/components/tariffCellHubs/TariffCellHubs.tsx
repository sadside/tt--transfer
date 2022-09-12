import "./tariffCellHubs.scss";
import { useEffect } from "react";
import plus from "../../assets/+.svg";

interface TariffCellHubsProps {
  register: any;
  id: number | undefined;
  driverPrice: number | undefined;
  customerPrice: number | undefined;
  setValue: any;
  errors: any;
}

const TariffCellHubs = ({
  register,
  id,
  driverPrice,
  customerPrice,
  setValue,
  errors,
}: TariffCellHubsProps) => {
  const driverInput = `driver-${id}`;
  const customerInput = `customer-${id}`;

  useEffect(() => {
    setValue(driverInput, driverPrice);
    setValue(customerInput, customerPrice);
  }, []);

  return (
    <td>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className={"tariff-price-wrap"}>
          <img src={plus} alt="" />
          <input
            type="text"
            className={`tariff-price-input ${
              errors[driverInput] && "tariff-price-input-active"
            }`}
            {...register(driverInput, {
              required: "Это поле обязательно",
              min: 0,
              pattern: /^\d+$/,
            })}
          />
          <div>Заказчик</div>
        </div>
        <div className={"tariff-price-wrap"}>
          <img src={plus} alt="" />
          <input
            type="text"
            className={`tariff-price-input ${
              errors[customerInput] && "tariff-price-input-active"
            }`}
            {...register(customerInput, {
              required: "Это поле обязательно",
              min: 0,
              pattern: /^\d+$/,
            })}
          />
          <div>Водитель</div>
        </div>
      </div>
    </td>
  );
};

export default TariffCellHubs;
