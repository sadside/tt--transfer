import React from "react";
import s from './employee.module.scss'

const Employee = () => {
  return (
    <div>
      <div className={s.employee}>
        <div className={s.point}>Иванов Иван Иванович</div>
        <div className={s.point}>+7 (123) 456-78-90</div>
        <div className={s.point}>123456789</div>
        <div className={s.point}>15.09.2022</div>
        <div className={s.point}>Менеджер</div>
      </div>
    </div>
  );
};

export default Employee;
