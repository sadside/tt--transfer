import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import AddClient from "../../components/addClient/AddClient";
import AddCompany from "../../components/addCompany/AddCompany";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import MainTable from "../../components/mainTable/MainTable";
import Pagination from "../../components/pagination/Pagination";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import {
  clientsFilterData,
  clientsTableBody,
  clientsTableHeaders,
  clientsTabs,
  counterpartiesTableBody,
  counterpartiesTableHeaders,
} from "../../db";
import "./clients.scss";
import "../../components/mainTable/mainTable.scss";

const Clients = () => {
  const [activeClientsTab, setActiveClientsTab] = useState(0);
  const [showSmartFilter, setShowSmartFilter] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  const [currentSecondPage, setCurrentSecondPage] = useState(1);
  const [secondCountriesPerPage, setSecondCountriesPerPage] = useState(10);

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const lastSecondCountryIndex = currentSecondPage * secondCountriesPerPage;
  const firstSecondCountryIndex =
    lastSecondCountryIndex - secondCountriesPerPage;

  const currentCountry = clientsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const currentСounterpartiesCountry = counterpartiesTableBody.slice(
    firstSecondCountryIndex,
    lastSecondCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const secondPaginate = (pageNumber) => setCurrentSecondPage(pageNumber);
  const nextSecondPage = () => setCurrentSecondPage((prev) => prev + 1);
  const prevSecondPage = () => setCurrentSecondPage((prev) => prev - 1);

  const handleTabClick = (index) => {
    setActiveClientsTab(index);
  };

  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };

  const handleShowAddClient = () => {
    setShowAddClient(true);
  };
  const handleShowAddCompany = () => {
    setShowAddCompany(true);
  };

  return (
    <>
      <Tabs items={clientsTabs} handleTabClick={handleTabClick} />
      <div className="clients-wrap">
        {activeClientsTab === 0 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить клиента"}
              callback={handleShowAddClient}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddClient && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={clientsFilterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={clientsTableHeaders}
              body={currentCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              setShowEditSidebar={handleShowAddClient}
              activeTab={activeClientsTab}
              setOnlyOneSelected={setOnlyOneSelected}
            />
          </>
        )}

        {activeClientsTab === 1 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить компанию"}
              callback={handleShowAddCompany}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddClient && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={clientsFilterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={counterpartiesTableHeaders}
              body={currentСounterpartiesCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              setShowEditSidebar={handleShowAddCompany}
              activeTab={activeClientsTab}
              setOnlyOneSelected={setOnlyOneSelected}
              isArchive={false}
            />
          </>
        )}
      </div>
      <AnimatePresence>
        {!showActionMenu && activeClientsTab === 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ position: "relative" }}
          >
            <Pagination
              countriesPerPage={countriesPerPage}
              totalCountries={clientsTableBody.length}
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
        {!showActionMenu && activeClientsTab === 1 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ position: "relative" }}
          >
            <Pagination
              countriesPerPage={secondCountriesPerPage}
              totalCountries={counterpartiesTableBody.length}
              paginate={secondPaginate}
              nextPage={nextSecondPage}
              prevPage={prevSecondPage}
              currentPage={currentSecondPage}
              setCountriesPerPage={setSecondCountriesPerPage}
              setCurrentPage={setCurrentSecondPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
        {showAddClient && (
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
              isVisible={showAddClient}
              toggleSidebar={setShowAddClient}
              title={"Добавить/изменить тариф"}
              isGray={false}
            >
              <AddClient />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddCompany && !showAddClient && (
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
              isVisible={showAddCompany}
              toggleSidebar={setShowAddCompany}
              title={"Добавить/изменить тариф"}
              isGray={false}
            >
              <AddCompany />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Clients;
