import React from "react";
import s from "./addEmployees.module.scss";

const AddEmployees = () => {
  return (
    <form className={s.wrapper}>
      <div className={s.formFields}>
        <div className={s.mainData}>
          <div className={s.title}>Основные данные</div>
          <div className={s.inputFields}>
            <label>
              <div>Логин (e-mail)</div>
              <input type="text" />
            </label>
            <label>
              <div>Номер телефона</div>
              <input type="text" />
            </label>
            <label>
              <div>Фамилия</div>
              <input type="text" />
            </label>
            <label>
              <div>Имя</div>
              <input type="text" />
            </label>
            <label>
              <div>Отчество</div>
              <input type="text" />
            </label>
          </div>
        </div>
        <div className={s.legalEntity}>
          <div className={s.title}>Юр лицо</div>
          <div className={s.inputFields}>
            <label>
              <div>Полное название</div>
              <input type="text" />
            </label>
            <label>
              <div>ИНН</div>
              <input type="text" />
            </label>
            <label>
              <div>Юр адрес</div>
              <input type="text" />
            </label>
            <label>
              <div>КПП</div>
              <input type="text" />
            </label>
            <label>
              <div>Расчетный счет</div>
              <input type="text" />
            </label>
            <label>
              <div>БИК Банка</div>
              <input type="text" />
            </label>
            <label>
              <div>Банк получателя</div>
              <input type="text" />
            </label>
            <label>
              <div>Корр счет</div>
              <input type="text" />
            </label>
          </div>
        </div>
      </div>
      <button className={s.button}>Сохранить</button>
    </form>
  );
};

export default AddEmployees;
