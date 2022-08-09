import { useState } from "react";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./editCar.scss";
import aston from "../../assets/aston.png";
import pts from "../../assets/pts.svg";

const EditCar = ({ handlePhotoClick }) => {
  const [carBrand, setCarBrand] = useState("Aston Martin");
  const [carModel, setCarModel] = useState("DBS");
  const [carPower, setCarPower] = useState("650 hp");
  const [carVolume, setCarVolume] = useState("5.0");
  const [carColor, setCarColor] = useState("Красный металлик");
  const [carEquipment, setCarEquipment] = useState("Люкс");
  const [carPTS, setCarPTS] = useState("");
  const [carSTS, setCarSTS] = useState("");

  return (
    <>
      <SidebarHeader title="Редактировать машину" />
      <div className="edit-car-wrap">
        <div className="car-info">
          <div className="car-image">
            <div className="car-image-wrap">
              <img src={aston} alt="" />
            </div>
          </div>
          <div className="car-info-inputs">
            <div className="car-full-name">{`${carBrand} ${carModel}`}</div>
            <div className="car-edit-inputs">
              <label className="car-label">
                Марка:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                />
              </label>

              <label className="car-label">
                Модель:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
              </label>

              <label className="car-label">
                Мощность:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carPower}
                  onChange={(e) => setCarPower(e.target.value)}
                />
              </label>

              <label className="car-label">
                Объем двигателя:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carVolume}
                  onChange={(e) => setCarVolume(e.target.value)}
                />
              </label>

              <label className="car-label">
                Цвет кузова:
                <input
                  type="text"
                  className={`not-active-input driver-adres`}
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                />
              </label>

              <label className="car-label">
                Комплектация:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carEquipment}
                  onChange={(e) => setCarEquipment(e.target.value)}
                />
              </label>

              <label className="car-label">
                ПТС:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carPTS}
                  onChange={(e) => setCarPTS(e.target.value)}
                />
              </label>

              <label className="car-label">
                НОМЕР СТС:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={carSTS}
                  onChange={(e) => setCarSTS(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="upload-car-documents-title-wrap">
          <div className="upload-car-documents-title">Загрузить документы:</div>
          <div className="upload-car-documents-title">
            Загруженные документы:
          </div>
        </div>
        <div className="upload-car-documents-wrap car-edit">
          <div className="upload-car-documents">Загрузить...</div>
          <div className="uploaded-car-documents">
            <img src={pts} alt="" onClick={handlePhotoClick} />
            <img src={pts} alt="" onClick={handlePhotoClick} />
          </div>
        </div>
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons
            firstTitle="Сбросить"
            secondTitle="Сохранить"
          />
        </div>
      </div>
    </>
  );
};

export default EditCar;
