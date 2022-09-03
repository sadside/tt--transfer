import rightArrow from "../../assets/rightArrow.svg";
import "./transferAddInput.scss";

const TransferAddInput = ({ intercity }) => {
  return (
    <div className={"inputs-wrap"}>
      <div className="first-info-inputs">
        <div style={{ flexGrow: 0 }}>
          <span>*</span>Страна
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Россия"
          />
        </div>
        {intercity && (
          <div>
            <span>*</span>Город
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Оренбург"
            />
          </div>
        )}
      </div>
      <div className="destination-selection">
        <div className="from">
          Откуда
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Откуда"
          />
        </div>
        <img src={rightArrow} alt="" className="from-to-arrow"/>
        <div className="to">
          Куда
          <input type="text" className="tariff-data-input" placeholder="Куда" />
        </div>
      </div>
      <div className="background-information">
        <div className="global-adress-wrap">
          <input type="checkbox" className="global-adress-checkbox" />
          <label>Глобальные адреса dd</label>
        </div>
        <div className="time-and-distance-inputs">
          <div className="global-adress-wrap">
            <label>Длительность</label>
            <input
              type="text"
              className="time-and-distance-input"
              placeholder="30 мин"
            />
          </div>
          <div className="global-adress-wrap">
            <label>Расстояние</label>
            <input
              type="text"
              className="time-and-distance-input"
              placeholder="18 км"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransferAddInput;
