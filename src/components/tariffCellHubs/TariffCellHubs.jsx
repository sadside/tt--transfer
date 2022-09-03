import "./tariffCellHubs.scss"
import plus from "../../assets/+.svg"

const TariffCellHubs = () => {
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
        <input type="text" className={"tariff-price-input"} />
        <div>Заказчик</div>
      </div>
      <div className={"tariff-price-wrap"}>
        <img src={plus} alt="" />
        <input type="text" className={"tariff-price-input"} />
        <div>Водитель</div>
      </div>
    </div>
  </td>
  )
}

export default TariffCellHubs