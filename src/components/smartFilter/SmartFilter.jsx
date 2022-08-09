import "./smartFilter.scss";
import Button from "../ui/button/Button";

const SmartFilter = ({ filterData, closeSmartFilter }) => {
  return (
    <div className="smart-filter-wrap-1">
      <div className={"smart-filter-wrap"}>
        <div></div>
        {filterData.map((item, index) => (
          <div className="filter-item" key={index}>
            <div className="filter-title">{item.title}</div>
            <div className="filter-value">
              <input
                type="text"
                className={"filter-input"}
                placeholder={item.placeholder}
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
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

export default SmartFilter;
