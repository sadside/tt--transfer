import { useState } from "react";
import AddIntercityTariff from "../addIntercityTariff/AddIntercityTariff";
import AddTarifInputs from "../addTariffinpus/AddTarifInputs";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import EditSidebarTableHeader from "../editSidebarTableHeader/EditSidebarTableHeader";
import Tabs from "../tabs/Tabs";
import "./addIntercityTariffSidebarContent.scss";

const AddIntercityTariffSidebarContent = ({ setTest }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <div className="tariffs-edit-sidebar-content-wrapper-header">
        <div className="edit-sidebar-tabs">
          <div
            className={`edit-sidebar-tab ${activeTabIndex === 0 && "active"}`}
            onClick={() => setActiveTabIndex(0)}
          >
            Межгородские
          </div>
          <div
            className={`edit-sidebar-tab ${activeTabIndex === 1 && "active"}`}
            onClick={() => setActiveTabIndex(1)}
          >
            Внутригородские
          </div>
        </div>

        <div className="tariffs-edit-sidebar-content-edit-part">
          <Tabs
            items={["Основная информация", "Таблица"]}
            style={{ marginTop: 33, backgroundColor: "#fff" }}
            handleTabClick={setActiveTab}
          />
          <form action="">
            {activeTab === 0 && <AddTarifInputs intercity={true} />}
            {activeTab === 1 && (
              <div>
                <EditSidebarTableHeader />
                <AddIntercityTariff setTest={setTest} />
              </div>
            )}
          </form>
          <EditSidebarSubmitButtons />
        </div>
      </div>
    </div>
  );
};

export default AddIntercityTariffSidebarContent;
