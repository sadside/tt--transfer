import "./tariffsEditSidebarTransfersContent.scss";
import { useEffect, useState } from "react";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarTableHeader from "../editSidebarTableHeader/SidebarTableHeader";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";
import HubsZonesTable from "../transferEditSidebarTable/HubsZonesTable";

const HubInfo = () => {
  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <SidebarHeader title="Добавить/изменить тариф" />
      <div className="tariffs-edit-sidebar-content-wrapper-transfers">
        <div>
          <SidebarTableHeader title="Зона - цены" />
          <HubsZonesTable />
        </div>
      </div>
    </div>
  );
};

export default HubInfo;
