import { useState } from "react";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./editDriver.scss";

const EditDriver = () => {
  const [phone, setPhone] = useState("+7 (123) 456-78-91");
  const [driverLicence, setDriverLicence] = useState("№856978");
  const [adress, setAdress] = useState("Оренбург, ул Салмышская д 36, кв 85");
  const [passport, setPassport] = useState("5314 856978");
  const [name, setName] = useState("Иванов Иван Иванович");
  // const [carColor, setCarColor] = useState("Красный металлик");
  // const [carEquipment, setCarEquipment] = useState("Люкс");
  // const [carPTS, setCarPTS] = useState("");
  // const [carSTS, setCarSTS] = useState("");

  return (
    <>
      <SidebarHeader title="Редактировать информацию о водителе" />
      <div className="edit-car-wrap">
        <div className="car-info">
          <div className="car-image">
            <div className="car-image-wrap">Загрузить аватарку</div>
          </div>
          <div className="car-info-inputs">
            <input
              type="text"
              className={`not-active-input driver-full-name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="car-edit-inputs">
              <label className="car-label">
                Телефон:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="car-label">
                Водительское удостоверение:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={driverLicence}
                  onChange={(e) => setDriverLicence(e.target.value)}
                />
              </label>

              <label className="car-label">
                Адрес:
                <input
                  type="text"
                  className={`not-active-input driver-adres`}
                  value={adress}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </label>

              <label className="car-label">
                Серия и номер паспорта:
                <input
                  type="text"
                  className={`not-active-input`}
                  value={passport}
                  onChange={(e) => setPassport(e.target.value)}
                />
              </label>

              {/*<label className="car-label">*/}
              {/*  Цвет кузова:*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    className={`not-active-input`}*/}
              {/*    value={carColor}*/}
              {/*    onChange={(e) => setCarColor(e.target.value)}*/}
              {/*  />*/}
              {/*</label>*/}

              {/*<label className="car-label">*/}
              {/*  Комплектация:*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    className={`not-active-input`}*/}
              {/*    value={carEquipment}*/}
              {/*    onChange={(e) => setCarEquipment(e.target.value)}*/}
              {/*  />*/}
              {/*</label>*/}

              {/*<label className="car-label">*/}
              {/*  ПТС:*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    className={`not-active-input`}*/}
              {/*    value={carPTS}*/}
              {/*    onChange={(e) => setCarPTS(e.target.value)}*/}
              {/*  />*/}
              {/*</label>*/}

              {/*<label className="car-label">*/}
              {/*  НОМЕР СТС:*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    className={`not-active-input`}*/}
              {/*    value={carSTS}*/}
              {/*    onChange={(e) => setCarSTS(e.target.value)}*/}
              {/*  />*/}
              {/*</label>*/}
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
            {/*<img src={pts} alt="" onClick={handlePhotoClick} />*/}
            {/*<img src={pts} alt="" onClick={handlePhotoClick} />*/}
            Вы еще не загрузили ни одного документа!
          </div>
        </div>
        <div className={"submit-buttons-wrap"}>
          <EditSidebarSubmitButtons
            firstTitle="Сбросить"
            secondTitle="Сохранить"
          />
        </div>
      </div>
    </>
  );
};

export default EditDriver;
