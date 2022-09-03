import "./tariffCell.scss"

const TariffCell = ({register, row, isVisiablePlus}) => {
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
            {...register(row.nameDriverStandard)}
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
  )
}

export default TariffCell