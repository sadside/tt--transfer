import "./addTarifinputs.scss";

const AddTarifInputs = ({ intercity }) => {
  return (
    <div className="tariffs-edit-sidebar-content-inputs">
      <div className="tariff-data">
        <label>
          <span className="required">*</span>Название тарифа
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
          />
        </label>
        <label>
          <span className="required">*</span>Страна
          <input
            type="text"
            className="tariff-data-input"
            placeholder="Введите название"
          />
        </label>

        {!intercity && (
          <label>
            <span className="required">*</span>Город
            <input
              type="text"
              className="tariff-data-input"
              placeholder="Введите название"
            />
          </label>
        )}
        <label>
          <span className="required">*</span>Валюта
          <select name="select" className={"select-currency"}>
            <option value="value2" selected>
              Российский рубль
            </option>
            <option value="value1">Доллар</option>
            <option value="value3">Евро</option>
          </select>
        </label>
      </div>
      <div className="tariff-comment">
        <label>
          Комментарии
          <textarea name="" id="" placeholder="Введите текст"></textarea>
        </label>
      </div>
    </div>
  );
};

export default AddTarifInputs;
