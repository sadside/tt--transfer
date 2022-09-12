import "./tariffCell.scss";
import { useEffect } from "react";
import loginFields from "../loginFields/LoginFields";

const TariffCell = ({
  register,
  id,
  driverPrice,
  customerPrice,
  setValue,
  errors,
}) => {
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
          width: "158px",
        }}
      >
        <div className={"tariff-price-wrap"}>
          <input
            type="text"
            className={`tariff-price-input ${
              errors[driverInput] && "tariff-price-input-active"
            }`}
            {...register(driverInput, {
              required: "Это поле обязательно",
              min: {
                error: "Введите неотрицательное число",
                value: 0,
              },
              pattern: /^\d+$/,
            })}
          />
          <div>Заказчик</div>
        </div>
        <div className={"tariff-price-wrap"}>
          <input
            type="text"
            className={`tariff-price-input ${
              errors[customerInput] && "tariff-price-input-active"
            }`}
            {...register(customerInput, {
              required: "Это поле обязательно",
              min: {
                error: "Введите неотрицательное число",
                value: 0,
              },
              pattern: /^\d+$/,
            })}
          />
          <div>Водитель</div>
        </div>
      </div>
    </td>
  );
};

export default TariffCell;
