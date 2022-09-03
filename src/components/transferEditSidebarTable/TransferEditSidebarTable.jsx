import { carsClasses } from "../../db";
import "./transferEditSidebarTable.scss";
import TariffCellHubs from "../tariffCellHubs/TariffCellHubs";

const TransferEditSidebarTable = ({
  showSecondRegion,
  setShowSecondRegion,
}) => {

  return (
    <div className="scroll-table-tariff ">
      <div className="scroll-table-body-tariff">
        <table>
          <thead>
            <tr>
              <th height="60" width="190">Типы услуг</th>
              <th height="60" width="190" className="green-zone">
                Стоимость
              </th>
              <th
                height="60"
                width="190"
                onClick={() => setShowSecondRegion(true)}
                className={`region transfer-link blue-zone ${!showSecondRegion && "transferLink-item-region"
                  }`}
              >
                <div>Удаленный район</div>
              </th>
              {showSecondRegion && (
                <th
                  height="60"
                  width="190"
                  className={"region red-zone transferLink-item-region"}
                >
                  <div>Удаленный район</div>
                </th>
              )}
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            {carsClasses.map((title) => {
              return (
                <tr>
                  <td>{title.carClass}</td>
                  <TariffCellHubs />
                  <TariffCellHubs />
                  {showSecondRegion && (
                    <TariffCellHubs />
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
