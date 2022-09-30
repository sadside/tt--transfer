import "./smartFilter.scss";
import Button from "../ui/button/Button";

interface SmartFilterTariffProps {
  filterData?: any[];
  closeSmartFilter: () => void;
}

const SmartFilterTariff = ({
  filterData,
  closeSmartFilter,
}: SmartFilterTariffProps) => {
  return (
    <div className="smart-filter-wrap-1">
      <div className={"smart-filter-wrap"}>
        <div></div>
        <div className="filter-item">
          <div className="filter-title">Регион</div>
          <div className="filter-value">
            <input type="text" className={"filter-input"} />
          </div>
        </div>
      </div>

      <div className="filter-button-wrap">
        <Button
          text="Найти"
          style={{ width: 160, marginBottom: 20, marginRight: 20 }}
        />
        <Button
          text="Закрыть"
          style={{ width: 160, marginBottom: 20, backgroundColor: "#364150" }}
          callback={closeSmartFilter}
        />
      </div>
    </div>
  );
};

export default SmartFilterTariff;
