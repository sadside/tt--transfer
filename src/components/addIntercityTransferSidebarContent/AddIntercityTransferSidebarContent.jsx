import { useState } from "react";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import EditSidebarTableHeader from "../editSidebarTableHeader/EditSidebarTableHeader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";
import TransferEditSidebarTable from "../transferEditSidebarTable/TransferEditSidebarTable";

const AddIntercityTransferSidebarContent = () => {
  const [showSecondRegion, setShowSecondRegion] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tableContent = [
    "Стандарт",
    "Комфорт",
    "Бизнес",
    "Представительский",
    "SUV",
    "Минивен",
    "Микроавтобус",
    "Минивен бизнес",
    "Микроавтобус бизнес",
  ];

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <div className="tariffs-edit-sidebar-content-wrapper-header transfers">
        Добавить/изменить тариф
      </div>
      <div className="tariffs-edit-sidebar-content-wrapper-transfers">
        <Tabs
          items={["Основная информация", "Таблица"]}
          style={{ backgroundColor: "#fff", marginBottom: 30 }}
          handleTabClick={setActiveTab}
        />
        {activeTab === 0 && <TransferAddInput intercity={false} />}
        {activeTab === 1 && (
          <div>
            <EditSidebarTableHeader />
            <div className="scroll-table-transfer">
              <table>
                <thead>
                  <tr>
                    <th height="60">Типы услуг</th>
                    <th height="60">Стоимость</th>
                  </tr>
                </thead>
              </table>
              <div className="scroll-table-body-tariff">
                <table>
                  <tbody>
                    {tableContent.map((item) => {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div className={"tariff-price-wrap"}>
                                <input
                                  type="text"
                                  className={"tariff-price-input"}
                                />
                                <div>Заказчик</div>
                              </div>
                              <div className={"tariff-price-wrap"}>
                                <input
                                  type="text"
                                  className={"tariff-price-input"}
                                />
                                <div>Водитель</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons />
        </div>
      </div>
    </div>
  );
};

export default AddIntercityTransferSidebarContent;
