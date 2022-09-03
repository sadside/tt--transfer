import "./tariffsEditSidebarContent.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddIntercityTariff from "../addIntercityTariff/AddIntercityTariff";
import AddTariffInputs from "../addTariffinpus/AddTariffInputs";
import AddTariffTable from "../addTariffTable/AddTariffTable";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import EditSidebarTableHeader from "../editSidebarTableHeader/EditSidebarTableHeader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";

const TariffsEditSidebarContent = ({ showTransfersSidebar, setTest }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const { handleSubmit } = useForm();

  useEffect(() => {
    setActiveTab(0);
  }, [activeTabIndex]);

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

        {activeTabIndex === 1 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <Tabs
              items={["Основная информация", "Таблица"]}
              style={{ marginTop: 33, backgroundColor: "#fff" }}
              handleTabClick={setActiveTab}
            />
            <form
              action=""
              onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
            >
              {activeTab === 0 && <AddTariffInputs />}
              {activeTab === 1 && (
                <div>
                  <EditSidebarTableHeader />
                  <AddTariffTable showTransfersSidebar={showTransfersSidebar} />
                </div>
              )}
            </form>
            <div className="submit-buttons-wrap">
              <EditSidebarSubmitButtons />
            </div>
          </div>
        )}
        {activeTabIndex === 0 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <Tabs
              items={["Основная информация", "Таблица"]}
              style={{ marginTop: 33, backgroundColor: "#fff" }}
              handleTabClick={setActiveTab}
            />
            <form action="">
              {activeTab === 0 && <AddTariffInputs intercity={true} />}
              {activeTab === 1 && (
                <div>
                  <EditSidebarTableHeader />
                  <AddIntercityTariff setTest={setTest} />
                </div>
              )}
            </form>
            <div className="submit-buttons-wrap">
              <EditSidebarSubmitButtons />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffsEditSidebarContent;
