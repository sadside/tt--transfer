import "./tariffCell.scss";
import { useEffect } from "react";

const TariffCell = ({ register, id, driverPrice, customerPrice, setValue }) => {
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
            className={"tariff-price-input"}
            {...register(driverInput, {
              required: "Это поле обязательно",
              min: {
                error: "Введите неотрицательное число",
                value: 0,
              },
            })}
          />
          <div>Заказчик</div>
        </div>
        <div className={"tariff-price-wrap"}>
          <input
            type="text"
            className={"tariff-price-input"}
            {...register(customerInput, {
              required: "Это поле обязательно",
              min: {
                error: "Введите неотрицательное число",
                value: 0,
              },
            })}
          />
          <div>Водитель</div>
        </div>
      </div>
    </td>
  );
};

export default TariffCell;
