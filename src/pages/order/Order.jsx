import "./order.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import EditSidebarSubmitButtons from "../../components/editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SelectCar from "../../components/selectCar/SelectCar";
import Tabs from "../../components/tabs/Tabs";
import { orderTabs } from "../../db";
import downArrowSelect from "../../assets/downArrowSelect.svg";
import addIcon from "../../assets/addIcon.svg";
import useOutside from "../../hooks/useOutside";
import longArrow from "../../assets/longArrow.svg";

const Order = () => {
  const [countRaces, setCountRaces] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [item, setItem] = useState("Стандарт");
  const [showSidebar, setShowSidebar] = useState(false);
  const { isShow, ref, setIsShow } = useOutside(false);
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

  return (
    <>
      <Tabs items={orderTabs} />
      <div className="order-wrap">
        <div className="first-order-fields">
          <div className="left-first-order-fields">
            <div className="from-calculator">
              Откуда
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Откуда"
              />
              <img src={longArrow} alt="" className="long-arrow-1" />
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
          <div className="right-first-order-fields">
            <div className="to-calculator">
              Куда
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Куда"
              />
            </div>
            <div className="order-price">
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
        <div className="second-order-fields">
          <div className="left-second-fields">
            <div className="order-input-wrap">
              <div>
                <span className="required">*</span>ФИО
              </div>
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Введите фио"
              />
            </div>
            <div className="order-input-wrap">
              <div>
                <span className="required">*</span>Телефон
              </div>
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Введите телефон"
              />
            </div>
            <div className="order-input-wrap">
              <div>
                <span className="required">*</span>Поле
              </div>
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Введите поле"
              />
            </div>
          </div>
          <div className="right-second-fields">
            <div className="order-date-time-pick">
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
            <div className="order-input-wrap">
              <div>
                <span className="required">*</span>Рейс
              </div>
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Введите рейс"
              />
            </div>
            <div className="order-input-wrap">
              <div>
                <span className="required">*</span>Поле
              </div>
              <input
                type="text"
                className="tariff-data-input order"
                placeholder="Введите поле"
              />
            </div>
          </div>

          <div className="right-second-fields"></div>
        </div>
        <div className={"order-buttons"}>
          <EditSidebarSubmitButtons
            firstTitle="Сбросить"
            secondTitle="Забронировать"
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

export default Order;
