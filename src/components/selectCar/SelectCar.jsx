import "./selectCar.scss";
import { useEffect, useState } from "react";
import { carsClasses } from "../../db";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import carSelected from "../../assets/carSelected.svg";

const SelectCar = () => {
  const [selectedCar, setSelectedCar] = useState(-1);

  return (
    <>
      <SidebarHeader title="Выберете класс авто" />
      <div className="select-car-wrap">
        <div className="car-items-main-wrap">
          <div className="car-items-wrap">
            {carsClasses.slice(0, 3).map((item, index) => (
              <div
                className="car-item"
                key={index}
                onClick={() => setSelectedCar(index)}
              >
                <img src={item.img} alt="" width={250} height={200} />
                <div className="car-descr">{item.carClass}</div>
                {selectedCar === index && (
                  <div className="car-selected-indicator">
                    <img src={carSelected} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="car-items-wrap">
            {carsClasses.slice(3, 6).map((item, index) => (
              <div
                className="car-item"
                key={index}
                onClick={() => setSelectedCar(index + 3)}
              >
                <img src={item.img} alt="" width={250} height={200} />
                <div className="car-descr">{item.carClass}</div>
                {selectedCar === index + 3 && (
                  <div className="car-selected-indicator">
                    <img src={carSelected} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="car-items-wrap">
            {carsClasses.slice(6, 9).map((item, index) => (
              <div
                className="car-item"
                key={index}
                onClick={() => setSelectedCar(index + 6)}
              >
                <img src={item.img} alt="" width={250} height={200} />
                <div className="car-descr">{item.carClass}</div>
                {selectedCar === index + 6 && (
                  <div className="car-selected-indicator">
                    <img src={carSelected} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={"submit-buttons-wrap"}>
          <EditSidebarSubmitButtons
            firstTitle="Сбросить"
            secondTitle="Добавить"
          />
        </div>
      </div>
    </>
  );
};

export default SelectCar;
