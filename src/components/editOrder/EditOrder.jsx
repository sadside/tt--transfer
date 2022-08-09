import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useOutside from "../../hooks/useOutside";
import CustomSelect from "../customSelect/CustomSelect";
import EditSidebar from "../editSidebar/EditSidebar";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SelectCar from "../selectCar/SelectCar";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import downArrowSelect from "../../assets/downArrowSelect.svg";
import addIcon from "../../assets/addIcon.svg";
import longArrow from "../../assets/longArrow.svg";

import "./editOrder.scss";

const EditOrder = () => {
  const [countRaces, setCountRaces] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [item, setItem] = useState("Стандарт");
  const [showSidebar, setShowSidebar] = useState(false);
  const selectItems = [
    "Стандарт",
    "Бизнес класс",
    "Представительский",
    "Минивен",
    "Микроавтобус",
    "Комфорт",
  ];

  const toggleVisibleSidebar = () => {
    setShowSidebar(true);
  };
  const { isShow, ref, setIsShow } = useOutside(false);

  return (
    <>
      <SidebarHeader title="Маршрут: Москва - Санкт Петербург" />
      <div className="edit-order-wrap">
        <div className="edit-order-fields">
          <div className="edit-order-fields-left">
            <div className="from-calculator">
              Откуда
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Откуда"
                value="Москва"
              />
              <img src={longArrow} alt="" className="long-arrow" />
            </div>
            <div className="order-date-time-pick order-date-pick">
              <div className="date-pick">
                <div>
                  <span className="required">*</span>Дата
                </div>
                <input type="date" className="tariff-data-input date-time" />
              </div>
              <div className="time-pick">
                <div>
                  <span className="required">*</span>Время
                </div>
                <input type="time" className="tariff-data-input date-time" />
              </div>
            </div>
            <div className="select-car-class-field" ref={ref}>
              <div>
                <div>
                  <span className="required">*</span>Выберите класс авто
                </div>
                <div
                  className="car-class-select"
                  onClick={() => setIsShow(!isShow)}
                >
                  <div>{item}</div>
                  <img src={downArrowSelect} alt="" />
                </div>
              </div>
              <CustomSelect
                items={selectItems}
                isVisible={isShow}
                setItem={setItem}
                setVisible={setIsShow}
                setShowSidebar={toggleVisibleSidebar}
              />
            </div>
            <div className="additional-races-wrap">
              <div className="additional-races">
                <div>Дополнительные заезды</div>
                <input
                  type="text"
                  className="tariff-data-input order"
                  placeholder="Введите адрес"
                />
                {countRaces.map(() => (
                  <input
                    type="text"
                    className="tariff-data-input order"
                    placeholder="Введите адрес"
                  />
                ))}
              </div>
              <div
                className="add-more-race"
                onClick={() => {
                  setCountRaces((prevState) => {
                    return [...prevState, null];
                  });
                }}
              >
                <img src={addIcon} alt="" />
                <div>Добавить еще адрес</div>
              </div>
            </div>
          </div>
          <div className="edit-order-fields-right">
            <div className="to-calculator">
              Куда
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Куда"
                value="Санкт - Петербург"
              />
            </div>
            <div className="order-price edit-order-price">
              Цена: <span>12 500 руб</span>
            </div>
            <div className="additional-options">
              <div>Дополнительные услуги</div>
              <img src={downArrowSelect} width={12} alt="" />
            </div>
            <div className="options-checkbox-wrap">
              <div className="select-additional-options">
                <label
                  htmlFor=""
                  className="select-additional-options-checkbox"
                >
                  <input type="checkbox" />
                  Табличка
                </label>
              </div>
              <div className="select-additional-options">
                <label
                  htmlFor=""
                  className="select-additional-options-checkbox"
                >
                  <input type="checkbox" />
                  Вода
                </label>
              </div>
              <div className="select-additional-options">
                <label
                  htmlFor=""
                  className="select-additional-options-checkbox"
                >
                  <input type="checkbox" />
                  Детское кресло
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="order-comment">
          <div>Комментарии</div>
          <textarea placeholder="Комментарии" />
        </div>
        <div className={"submit-buttons-wrap"}>
          <EditSidebarSubmitButtons
            firstTitle="В архив"
            secondTitle="Сохранить"
          />
        </div>
      </div>
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 1070, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            style={{
              overflow: "hidden",
              display: "flex",
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 2200,
            }}
            transition={{ type: "Tween" }}
          >
            <EditSidebar
              isVisible={showSidebar}
              toggleSidebar={setShowSidebar}
              title={"Добавить/изменить тариф"}
            >
              <SelectCar />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditOrder;
