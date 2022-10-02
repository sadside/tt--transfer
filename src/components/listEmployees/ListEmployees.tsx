import Employee from '../employee/Employee';
import s from './listEmployees.module.scss'
import { useState } from "react";
import AddEmployees from '../addEmployees/AddEmployees';

const ListEmployees = () => {
  const [addedEmloyee, setAddedEmloyee] = useState(false)

  return (
    <>
    {
      !addedEmloyee && (
      <div className={s.wrapper}>
        <div className={s.title}>Список сотрудников</div>
        <div className={s.points}>
          <div className={s.point}>ФИО</div>
          <div className={s.point}>Телефон</div>
          <div className={s.point}>ИНН</div>
          <div className={s.point}>Дата</div>
          <div className={s.point}>Должность</div>
        </div>
        <div className={s.conteinerEmployees}>
          <Employee />

          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />

          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
          <Employee />

          <Employee />
          <Employee />
        </div>
        <button className={s.button} onClick={() => setAddedEmloyee(true)}>Добавить сотрудника</button>
      </div>
      )
    }
    {
      addedEmloyee && (
        <AddEmployees />
      )
    }
    </>
  );
};

export default ListEmployees;
