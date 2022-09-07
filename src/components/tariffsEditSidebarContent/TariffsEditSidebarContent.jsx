import "./tariffsEditSidebarContent.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
import AddIntercityTariff from "../addIntercityTariff/AddIntercityTariff";
import AddTariffInputs from "../addTariffinpus/AddTariffInputs";
import AddTariffTable from "../addTariffTable/AddTariffTable";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import EditSidebarTableHeader from "../editSidebarTableHeader/EditSidebarTableHeader";
import Loader from "../loader/Loader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";

const TariffsEditSidebarContent = ({ showTransfersSidebar, setTest }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [activeTabIndex]);

  const tariff = useAppSelector((state) => state.tariff.tariff);

  return (
    <div className={"tariffs-edit-sidebar-content-wrapper"}>
      <div className="tariffs-edit-sidebar-content-wrapper-header">
        <div className="edit-sidebar-tabs">
          <div
            className={`edit-sidebar-tab ${activeTabIndex === 0 && "active"}`}
            onClick={() => setActiveTabIndex(0)}
          >
            Основная информация
          </div>
          {tariff && (
            <>
              <div
                className={`edit-sidebar-tab ${
                  activeTabIndex === 1 && "active"
                }`}
                onClick={() => setActiveTabIndex(1)}
              >
                Внутригородские
              </div>
              <div
                className={`edit-sidebar-tab ${
                  activeTabIndex === 2 && "active"
                }`}
                onClick={() => setActiveTabIndex(2)}
              >
                Межгородские
              </div>
            </>
          )}
        </div>

        {activeTabIndex === 0 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <AddTariffInputs />
            </div>
            {tariff && (
              <div className="submit-buttons-wrap">
                <EditSidebarSubmitButtons />
              </div>
            )}
          </div>
        )}

        {activeTabIndex === 1 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <EditSidebarTableHeader />
              <AddTariffTable showTransfersSidebar={showTransfersSidebar} />
            </div>
            <div className="submit-buttons-wrap">
              <EditSidebarSubmitButtons />
            </div>
          </div>
        )}
        {activeTabIndex === 2 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <EditSidebarTableHeader />
              <AddIntercityTariff setTest={setTest} />
            </div>
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
