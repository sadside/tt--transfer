import styles from "./addOrder.module.scss"
import plus from "../../assets/icons8-плюс-48 3.png"
import arrow from "../../assets/Arrow 2.png"
import arrowSelect from "../../assets/downArrowSelect.svg"
import { useState } from "react"
import Select from "../select/Select"
import { AnimatePresence, motion } from "framer-motion"
import EditSidebar from "../editSidebar/EditSidebar"
import SelectCar from "../selectCar/SelectCar"
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons"
import SidebarHeader from "../sidebarHeader/SidebarHeader"

const AddOrder = () => {

  const items = [
    {
      title: "Стандарт",
    },
    {
      title: "Комфорт",
    },
    {
      title: "Минивен",
    },
    {
      title: "Бизнес класс",
    },
    {
      title: "Представительский",
    },
  ];
  const [showSelect, setShowSelect] = useState(false);
  const [selectActiveItem, setSelectActiveItem] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleVisibleSidebar = () => {
    setShowSidebar(true);
  };

  return (
    <div className={styles.addOrderWrapper}>
      <div className={styles.header}>
        <p>Добавить заказ</p>
      </div>
      {/* <SidebarHeader title="Добавить заказ" /> */}

      <div className={styles.formWrapper}>

        <div className={styles.formWrapperScroll}>
          <div className={styles.detailsConteiner}>
            <div className={styles.titleConteiner}>
              <div className={styles.title}>Детали заказа</div>
              <div className={styles.title}>Подробности заказа</div>
              <div className={styles.title}>Маршрут заказа</div>
            </div>

            <form action="" className={styles.formDetails}>
              <div className={styles.formItem}>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Заказчик</p>
                  <input type="text" placeholder="Ввидите заказчика" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Юр лицо заказчик</p>
                  <input type="text" placeholder="Ввидите  название" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Наше юр лицо</p>
                  <input type="text" placeholder="Ввидите название" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Менеджер</p>
                  <input type="text" placeholder="Иванов Иван" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Дата/время</p>
                  <input type="text" placeholder="27.07.2022 19:00" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Город</p>
                  <input type="text" placeholder="Оренбург" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Выберете класс авто</p>
                  <Select
                    setShowSelect={setShowSelect}
                    showSelect={showSelect}
                    setSelectItem={setSelectActiveItem}
                    items={items}
                    text={selectActiveItem || items[0].title}
                    haveButton={true}
                    callback={toggleVisibleSidebar}
                  />

                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Тариф</p>
                  <input type="text" placeholder="" />
                </div>
              </div>

              <div className={styles.formItem}>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Число гостей</p>
                  <input type="text" placeholder="Ввидите число" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Телефон гостя</p>
                  <input type="text" placeholder="Ввидите  номер" />
                  <div className={styles.additionalConteiner}>
                    <img src={plus} alt="" />
                    <p className={styles.additional}>Добавить доп телефон</p>
                  </div>
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Имя</p>
                  <input type="text" placeholder="Ввидите имя" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Примечание заказчика</p>
                  <input type="text" placeholder="Иванов Иван" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Инфо от водителя</p>
                  <input type="text" placeholder="Текст" />
                </div>
                <div className={`${styles.inputConteiner} ${styles.inputConteinerHalf}`}>
                  <div className={styles.inputHalf}>
                    <p className={styles.titleInput}><span>*</span>Поезд</p>
                    <input type="text" placeholder="123" />
                  </div>
                  <div className={styles.inputHalf}>
                    <p className={styles.titleInput}><span>*</span>Вагон</p>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Номер рейса</p>
                  <input type="text" placeholder="Рейс" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Номер терминала</p>
                  <input type="text" placeholder="Терминал" />
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}><span>*</span>Отправление</p>
                  <input type="text" placeholder="27.07.2022 19:00" />
                </div>
              </div>

              <div className={styles.formItem}>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}>Откуда</p>
                  <div className={styles.showMapConteiner}>
                    <span>A</span>
                    <input type="text" />
                    <div className={styles.showMap}>Показать карту</div>
                    <img src={arrow} alt="" />
                  </div>
                </div>
                <div className={styles.inputConteiner}>
                  <p className={styles.titleInput}>Куда</p>
                  <div className={styles.showMapConteiner}>
                    <span>Б</span>
                    <input type="text" />
                    <div className={styles.showMap}>Показать карту</div>
                  </div>
                  <div className={styles.additionalConteiner}>
                    <img src={plus} alt="" />
                    <p className={styles.additional}>Добавить доп заезд</p>
                  </div>
                </div>
                <div className={styles.servicesConteiner}>
                  <p className={styles.servicesTitle}>Дополнительные услуги</p><img src={arrowSelect} alt="" />
                  <div className={styles.checkboxConteiner}>
                    <div className={styles.checkboxItem}>
                      <input type="checkbox" id="happy" name="happy" value="yes" />
                      <label for="happy">Табличка</label>
                    </div>
                    <div className={styles.checkboxItem}>
                      <input type="checkbox" id="happy1" name="happy" value="yes" />
                      <label for="happy1">Вода</label>
                    </div>
                    <div className={styles.checkboxItem}>
                      <input type="checkbox" id="happy2" name="happy" value="yes" />
                      <label for="happy2">Детское кресло</label>
                    </div>
                    <div className={styles.armchairConteiner}>
                      <div className={styles.armchairTitle}>Выберете тип кресла</div>
                      <div className={styles.size}>
                        <div className={styles.sizeItem}>0-1</div>
                        <div className={`${styles.sizeItem} ${styles.active}`}>01-03</div>
                        <div className={styles.sizeItem}>03-07</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.reverseTransfer}>
            <div className={styles.reverseTitle}>
              <p>Обратный трансфер</p>
              <img src={plus} alt="" />
            </div>

            <form action="" className={styles.reverseForm}>
              <div className={styles.fromtoConteiner}>
                <div className={styles.fromtoItem}>
                  <p className={styles.fromtoTitle}>Откуда</p>
                  <input type="text" className={styles.fromtoInput} />
                  <span>A</span>
                  <img src={arrow} alt="" />
                  <p className={styles.change}>Изменить</p>
                </div>
                <div className={styles.fromtoItem}>
                  <p className={styles.fromtoTitle}>Откуда</p>
                  <input type="text" className={styles.fromtoInput} placeholder="Ввидите адрес" />
                  <span>Б</span>
                </div>
              </div>

              <p className={styles.fromtoTitle}><span>*</span>Дата/время</p>
              <input type="text" className={styles.fromtoInput} placeholder="27.07.2022 19:00" />


            </form>
          </div>
        </div>

        <div className={styles.submitButtonsWrap}>
          <EditSidebarSubmitButtons
            firstTitle="Отмена"
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

    </div>
  )
}

export default AddOrder