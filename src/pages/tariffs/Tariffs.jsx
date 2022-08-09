import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import AddIntercityTariffSidebarContent from "../../components/addIntercityTariffSidebarContent/AddIntercityTariffSidebarContent";
import AddIntercityTransferSidebarContent from "../../components/addIntercityTransferSidebarContent/AddIntercityTransferSidebarContent";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import MainTable from "../../components/mainTable/MainTable";
import Pagination from "../../components/pagination/Pagination";
import SmartFilter from "../../components/smartFilter/SmartFilter";
import Tabs from "../../components/tabs/Tabs";
import "./tariffs.scss";
import TariffsEditSidebarContent from "../../components/tariffsEditSidebarContent/TariffsEditSidebarContent";
import TariffsEditSidebarTransfersContent from "../../components/tariffsEditSidebarTransfersContent/TariffsEditSidebarTransfersContent";
import {
  tariffsFilterData,
  tariffsTableBody,
  tariffsTableHeaders,
  tariffsTabs,
} from "../../db";

const Tariffs = () => {
  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [activeTariffTab, setActiveTariffTab] = useState(0);
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [showEditSidebarTransfers, setShowEditSidebarTransfers] =
    useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [test, setTest] = useState(false);
  const [showEditSidebarIntercity, setShowEditSidebarIntercity] =
    useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);
  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const currentCountry = tariffsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };

  const handleTabClick = (index) => {
    setActiveTariffTab(index);
  };

  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  return (
    <>
      <Tabs items={tariffsTabs} handleTabClick={handleTabClick} />
      <div className="tariffs-wrapper">
        <BlockHeader
          showSmartFilter={showSmartFilter}
          FilterVisible={setShowSmartFilter}
          buttonText={"Добавить тариф"}
          callback={() => setShowEditSidebar(true)}
        />
        <AnimatePresence>
          {showSmartFilter &&
            !showEditSidebar &&
            !showEditSidebarTransfers &&
            !showEditSidebarIntercity &&
            !test && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: "hidden" }}
                transition={{ type: "Tween" }}
              >
                <SmartFilter
                  filterData={tariffsFilterData}
                  closeSmartFilter={closeSmartFilter}
                />
              </motion.div>
            )}
        </AnimatePresence>
        <MainTable
          headers={tariffsTableHeaders}
          body={currentCountry}
          haveInputs={true}
          handleShowActionMenu={handleShowActionMenu}
          setShowEditSidebar={() => setShowEditSidebar(true)}
          activeTab={0}
          setOnlyOneSelected={setOnlyOneSelected}
        />
      </div>
      <AnimatePresence>
        {showActionMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <ActionMenu handleItemClick={onlyOneSelected} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showActionMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ position: "relative" }}
          >
            <Pagination
              countriesPerPage={countriesPerPage}
              totalCountries={tariffsTableBody.length}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              setCountriesPerPage={setCountriesPerPage}
              setCurrentPage={setCurrentPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditSidebar && (
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
              zIndex: 1000,
            }}
            transition={{ type: "Tween" }}
          >
            <EditSidebar
              isVisible={showEditSidebar}
              toggleSidebar={setShowEditSidebar}
              title={"Добавить/изменить тариф"}
            >
              <TariffsEditSidebarContent
                showTransfersSidebar={setShowEditSidebarTransfers}
                setTest={setTest}
              />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditSidebarTransfers && (
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
              zIndex: 2000,
            }}
            transition={{ type: "Tween" }}
          >
            <EditSidebar
              isVisible={showEditSidebarTransfers}
              toggleSidebar={setShowEditSidebarTransfers}
              title={"Добавить/изменить тариф"}
            >
              <TariffsEditSidebarTransfersContent />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditSidebarIntercity && (
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
              zIndex: 2100,
            }}
            transition={{ type: "Tween" }}
          >
            <EditSidebar
              isVisible={showEditSidebarIntercity}
              toggleSidebar={setShowEditSidebarIntercity}
              title={"Добавить/изменить тариф"}
            >
              <AddIntercityTariffSidebarContent setTest={setTest} />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {test && (
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
              isVisible={test}
              toggleSidebar={setTest}
              title={"Добавить/изменить тариф"}
            >
              <AddIntercityTransferSidebarContent />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tariffs;
