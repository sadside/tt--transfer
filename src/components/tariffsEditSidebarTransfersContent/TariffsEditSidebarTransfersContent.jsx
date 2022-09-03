import "./tariffsEditSidebarTransfersContent.scss";
import { useEffect, useState } from "react";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import EditSidebarTableHeader from "../editSidebarTableHeader/EditSidebarTableHeader";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";
import TransferEditSidebarTable from "../transferEditSidebarTable/TransferEditSidebarTable";

const TariffsEditSidebarTransfersContent = () => {
  const [showSecondRegion, setShowSecondRegion] = useState();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, []);

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <SidebarHeader title="Добавить/изменить тариф" />
      <div className="tariffs-edit-sidebar-content-wrapper-transfers">
        <Tabs
          items={["Основная информация", "Таблица"]}
          style={{ backgroundColor: "#fff", marginBottom: 30 }}
          handleTabClick={setActiveTab}
        />
        {activeTab === 0 && <TransferAddInput intercity={true} />}
        {activeTab === 1 && (
          <div>
            <EditSidebarTableHeader />
            <TransferEditSidebarTable
              showSecondRegion={showSecondRegion}
              setShowSecondRegion={setShowSecondRegion}
            />
          </div>
        )}
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons />
        </div>
      </div>
    </div>
  );
};

export default TariffsEditSidebarTransfersContent;
