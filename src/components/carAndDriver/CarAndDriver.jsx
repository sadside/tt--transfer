import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./carAndDriver.scss";
import Button from "../ui/button/Button";

const CarAndDriver = () => {
  return (
    <>
      <SidebarHeader title={"Добавления водителя / автомобиля"} />
      <div className="car-and-driver-wrap">
        <div className="add-car">
          <div className="add-car-fields">
            <div className="add-car-photo">
              <div className="car-photo-wrap">Загрузите фото</div>
            </div>
            <div className="add-car-info">
              <label>
                <span className="required">*</span>Марка
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите марку автомобиля"
                />
              </label>
              <label>
                <span className="required">*</span>Модель
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите модель автомобиля"
                />
              </label>
              <label>
                <span className="required">*</span>Мощность
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите мощность автомобиля"
                />
              </label>
              <label>
                <span className="required">*</span>Объем двигателя
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите объем двигателя"
                />
              </label>
              <label>
                <span className="required">*</span>Цвет кузова
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите цвет кузова"
                />
              </label>
              <label>
                <span className="required">*</span>Комплектация
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите комплектацию"
                />
              </label>
              <label>
                <span className="required">*</span>ПТС
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите ПТС автомобиля"
                />
              </label>
              <label>
                <span className="required">*</span>НОМЕР СТС
                <input
                  type="text"
                  className="tariff-data-input car-input"
                  placeholder="Введите номер СТС автомобиля"
                />
              </label>
            </div>
          </div>
          <div className="upload-car-documents-title-wrap">
            <div className="upload-car-documents-title">
              Загрузить документы:
            </div>
            <div className="upload-car-documents-title">
              Загруженные документы:
            </div>
          </div>
          <div className="upload-car-documents-wrap-1">
            <div className="upload-car-documents-1">Загрузить...</div>
          </div>
        </div>
        <div className="add-driver">
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
            <div className="upload-car-documents-title">
              Загрузить документы:
            </div>
            <div className="upload-car-documents-title">
              Загруженные документы:
            </div>
          </div>
          <div className="upload-car-documents-wrap-1">
            <div className="upload-car-documents-1">Загрузить...</div>
          </div>
        </div>
      </div>
      <div className="request-submit-buttons-wrap">
        <div className="edit-driver-and-car">Добавить еще автомобиль</div>
        <div className="request-submit-buttons">
          <Button
            text="Сбросить"
            style={{ backgroundColor: "#364150", width: 180 }}
          />
          <Button text="Сохранить" style={{ width: 180, marginLeft: 15 }} />
        </div>
      </div>
    </>
  );
};

export default CarAndDriver;
