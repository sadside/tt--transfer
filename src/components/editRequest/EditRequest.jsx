import { firstLeftInfoRequest, firstRightInfoRequest } from "../../db";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import downArrow from "../../assets/downArrow.svg";
import "./editRequest.scss";
import Button from "../ui/button/Button";

const EditRequest = ({ setShowCarAndDriver }) => {
  return (
    <>
      <SidebarHeader title="Номер заказа НФ-000002042423" />
      <div className="edit-requests-wrap">
        <div className="edit-request">
          <div className="first-requests-info">
            <div className="first-requests-info-left">
              <ul className="first-requests-info-left-list">
                {firstLeftInfoRequest.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="first-requests-info-right">
              {firstRightInfoRequest.map((item, index) => (
                <input
                  type="text"
                  value={item}
                  className="request-edit-input"
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="second-requests-info">
            <div className="request-pay-info">
              <div className="request-pay-info-header">Стоимость поездки</div>
              <div className="request-pay-info-value">Безналичный расчет</div>
            </div>
            <div className="second-requests-info-client">
              <div className="second-requests-info-client-left">
                <ul className="second-requests-info-left-list">
                  <li>Пассажир:</li>
                  <li>Телефон:</li>
                  <li>Статус:</li>
                </ul>
              </div>
              <div className="second-request-info-right">
                <input
                  type="text"
                  value={"Ивано Иван"}
                  className="request-edit-input-client"
                />{" "}
                <input
                  type="text"
                  value={"+77777777777"}
                  className="request-edit-input-client"
                />{" "}
                <input
                  type="text"
                  value={""}
                  className="request-edit-input-client"
                />
              </div>
            </div>
            <div className="choose-driver-and-car">
              <div className="choose-driver-and-car-first-wrap">
                <div className="choose-driver-and-car-select-1">
                  <div>Выберите водителя</div>
                  <img src={downArrow} alt="" width={18} />
                </div>

                <div className="choose-driver-and-car-select-2">
                  <div>Выберите автомобиль</div>
                  <img src={downArrow} alt="" width={18} />
                </div>
              </div>
              <div className="choose-driver-and-car-second-wrap">
                <div className="choose-driver-and-car-select-3">
                  <div>Выберите тариф</div>
                  <img src={downArrow} alt="" width={18} />
                </div>
                <Button
                  text="Добавить нового водителя"
                  style={{ width: 220 }}
                  callback={() => setShowCarAndDriver(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="finally-requests-info">
          <div className="finally-requests-info-header">
            <div className="long-block-header">Наименование</div>
            <div className="short-block-header">Цена</div>
            <div className="short-block-header">Кол-во</div>
            <div className="short-block-header">Сумма</div>
            <div className="long-block-header">Наименование</div>
            <div className="short-block-header">Цена</div>
            <div className="short-block-header">Кол-во</div>
            <div className="short-block-header">Сумма</div>
          </div>
          <div className="finally-requests-info-body">
            <div>
              <div className="long-block-body">Трансфер</div>
              <div className="long-block-body">Стоимость по пробегу</div>
              <div className="long-block-body">Ожидание</div>
              <div className="long-block-body">Дополнительный заезд</div>
            </div>

            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="long-block-body">Встреча с табличкой</div>
              <div className="long-block-body">Аренда авто</div>
              <div className="long-block-body">Подача автомобиля</div>
              <div className="long-block-body">Платные услуги</div>
              <div className="long-block-body dark-body">Итого к оплате</div>
            </div>
            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>

              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input"
                    value="730"
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
              <div className="short-block-body">
                <div>
                  <input
                    type="text"
                    className="finally-requests-input total-price"
                    value="730"
                    disabled={true}
                  />
                  <div className="input-underline"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="note-wrap">
            <div>Примечание:</div>
            <textarea placeholder="Напишите..." />
          </div>
        </div>
      </div>
      <div className="submit-buttons-wrap">
        <div className="request-submit-buttons">
          <Button
            text="Отмена"
            style={{ backgroundColor: "#364150", width: 180 }}
          />
          <Button text="Сохранить" style={{ width: 180, marginLeft: 15 }} />
        </div>
      </div>
    </>
  );
};

export default EditRequest;
