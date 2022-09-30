import { useEffect, useState } from "react";
import { Simulate } from "react-dom/test-utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setShowAddCity } from "../../store/tariffSlice";
import CityPricesTable from "../addIntercityTariff/CityPricesTable";
import AddTariffInputs from "../addTariffinpus/AddTariffInputs";
import AddTariffTable from "../addTariffTable/AddTariffTable";
import ServicesTable from "../addTariffTableType/ServicesTable";
import "../tariffsEditSidebarContent/tariffsEditSidebarContent.scss";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarTableHeader from "../editSidebarTableHeader/SidebarTableHeader";
import ErrorComponent from "../errorComponent/ErrorComponent";
import Loader from "../loader/Loader";
import styles from "./EditTariff.module.scss";

interface EditTariffProps {}

const EditTariff = ({}: EditTariffProps) => {
  const dispatch = useAppDispatch();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const status = useAppSelector((state) => state.tariff.status);
  const tariff = useAppSelector((state) => state.tariff.activeTariff);
  const error = useAppSelector((state) => state.tariff.error);

  useEffect(() => {}, []);

  if (status === "tariff loading") return <Loader />;

  if (error) return <div className={styles.error}>{error}</div>;

  const setShowAddCitySidebar = () => {
    dispatch(setShowAddCity({ value: true }));
  };

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
                <EditSidebarSubmitButtons firstTitle={"Удалить тариф"} />
              </div>
            )}
          </div>
        )}

        {activeTabIndex === 1 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <SidebarTableHeader linkField="" title={"Хабы"} />
              <AddTariffTable showTransfersSidebar={() => 1} />
            </div>
          </div>
        )}
        {activeTabIndex === 2 && (
          <div className="tariffs-edit-sidebar-content-edit-part">
            <div>
              <SidebarTableHeader
                linkField="Город/глобальный адрес"
                title={"Цены за километр"}
                handleClick={setShowAddCitySidebar}
              />
              <CityPricesTable />
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

export default EditTariff;
