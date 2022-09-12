import "./tariffsEditSidebarContent.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setShowAddCity } from "../../store/tariffSlice";
import CityPricesTable from "../addIntercityTariff/CityPricesTable";
import AddTariffInputs from "../addTariffinpus/AddTariffInputs";
import AddTariffTable from "../addTariffTable/AddTariffTable";
import ServicesTable from "../addTariffTableType/ServicesTable";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarTableHeader from "../editSidebarTableHeader/SidebarTableHeader";
import Loader from "../loader/Loader";
import Tabs from "../tabs/Tabs";
import TransferAddInput from "../transferAddInputs/TransferAddInput";

const TariffsEditSidebarContent = ({ showTransfersSidebar, setTest }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tariff = useAppSelector((state) => state.tariff.activeTariff);

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
              <div
                className={`edit-sidebar-tab ${
                  activeTabIndex === 3 && "active"
                }`}
                onClick={() => setActiveTabIndex(3)}
              >
                Цены по типам услуг
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
              <SidebarTableHeader title="Хабы" />
              <AddTariffTable showTransfersSidebar={showTransfersSidebar} />
            </div>
          </div>
        )}
        {activeTabIndex === 2 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <SidebarTableHeader
                linkField="Город/глобальный адрес"
                title="Цены за километр"
              />
              <CityPricesTable setTest={setTest} />
            </div>
          </div>
        )}

        {activeTabIndex === 3 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <SidebarTableHeader linkField="" title="Цены по типам услуг" />
              <ServicesTable />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TariffsEditSidebarContent;
