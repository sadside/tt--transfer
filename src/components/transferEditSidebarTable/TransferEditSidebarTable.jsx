import "./transferEditSidebarTable.scss";

const TransferEditSidebarTable = ({
  showSecondRegion,
  setShowSecondRegion,
}) => {
  const tableContent = [
    "Стандарт",
    "Комфорт",
    "Бизнес",
    "Представительский",
    "SUV",
    "Минивен",
    "Микроавтобус",
    "Минивен бизнес",
    "Микроавтобус бизнес",
  ];

  return (
    <div className="scroll-table-transfer">
      <table>
        <thead>
          <tr>
            <th height="60">Типы услуг</th>
            <th height="60" className="green-zone">
              Стоимость
            </th>
            <th
              height="60"
              onClick={() => setShowSecondRegion(true)}
              className={`region transfer-link blue-zone ${
                !showSecondRegion && "transferLink-item-region"
              }`}
            >
              <div>Удаленный район</div>
            </th>
            {showSecondRegion && (
              <th
                height="60"
                className={"region red-zone transferLink-item-region"}
              >
                <div>Удаленный район</div>
              </th>
            )}
          </tr>
        </thead>
      </table>
      <div className="scroll-table-body-tariff">
        <table>
          <tbody>
            {tableContent.map((item) => {
              return (
                <tr>
                  <td>{item}</td>
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
                        <input type="text" className={"tariff-price-input"} />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input type="text" className={"tariff-price-input"} />
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
                        <input type="text" className={"tariff-price-input"} />
                        <div>Заказчик</div>
                      </div>
                      <div className={"tariff-price-wrap"}>
                        <input type="text" className={"tariff-price-input"} />
                        <div>Водитель</div>
                      </div>
                    </div>
                  </td>
                  {showSecondRegion && (
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
                          <input type="text" className={"tariff-price-input"} />
                          <div>Заказчик</div>
                        </div>
                        <div className={"tariff-price-wrap"}>
                          <input type="text" className={"tariff-price-input"} />
                          <div>Водитель</div>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferEditSidebarTable;
