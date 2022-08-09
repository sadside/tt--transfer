import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import Button from "../ui/button/Button";
import driverLicence from "../../assets/driverLicense.png";

const AddDriver = ({ handlePhotoClick }) => {
  return (
    <>
      <SidebarHeader title="Добавить водителя" />
      <div className="add-car-wrap">
        <div className="add-car-fields">
          <div className="add-car-photo">
            <div className="car-photo-wrap">Загрузить аватарку</div>
          </div>
          <div className="add-car-info">
            <label>
              <span className="required">*</span>Имя
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите имя"
              />
            </label>
            <label>
              <span className="required">*</span>Фамилия
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите фамилию"
              />
            </label>
            <label>
              <span className="required">*</span>Отчество
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите отчество"
              />
            </label>
            <label>
              <span className="required">*</span>Телефон
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите телефон"
              />
            </label>
            <label>
              <span className="required">*</span>Водительское удостоверение
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите водительское удостоверение "
              />
            </label>
            <label>
              <span className="required">*</span>Адрес
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите адрес"
              />
            </label>
            <label>
              <span className="required">*</span>Серия и номер паспорта
              <input
                type="text"
                className="tariff-data-input car-input"
                placeholder="Введите серию и номер паспорта"
              />
            </label>
          </div>
        </div>
        <div className="upload-car-documents-title-wrap">
          <div className="upload-car-documents-title">Загрузить документы:</div>
          <div className="upload-car-documents-title">
            Загруженные документы:
          </div>
        </div>
        <div className="upload-car-documents-wrap">
          <div className="upload-car-documents">Загрузить...</div>
          <div className="uploaded-car-documents">
            <img src={driverLicence} alt="" onClick={handlePhotoClick} />
            <img src={driverLicence} alt="" onClick={handlePhotoClick} />
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

export default AddDriver;
