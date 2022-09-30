import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import ArchiveActionMenu from "../../components/archiveActionMenu/ArchiveActionMenu";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditOrder from "../../components/editOrder/EditOrder";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import MainTable from "../../components/mainTable/MainTable";
import Pagination from "../../components/pagination/Pagination";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import {
  ordersFilterFields,
  ordersTableBody,
  ordersTableHeader,
  ordersTabs,
} from "../../db";
import "./orders.scss";

const Orders = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showActionMenuArchive, setShowActionMenuArchive] = useState(false);
  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const currentCountry = ordersTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleShowActionMenuArchive = (value) => {
    setShowActionMenuArchive(value);
  };

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };
  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };
  return (
    <>
      <Tabs items={ordersTabs} handleTabClick={setActiveTab} />
      <div className="orders-wrap">
        {activeTab === 0 && (
          <>
            <BlockHeader
              FilterVisible={setShowSmartFilter}
              showSmartFilter={showSmartFilter}
              buttonText={"Добавить заказ"}
              callback={() => setShowSidebar(true)}
            />
            <AnimatePresence>
              {showSmartFilter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    overflow: "hidden",
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={ordersFilterFields}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={ordersTableHeader}
              body={currentCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              setShowEditSidebar={setShowSidebar}
              activeTab={activeTab}
              handleShowActionMenuArchive={handleShowActionMenuArchive}
              setOnlyOneSelected={setOnlyOneSelected}
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <BlockHeader
              FilterVisible={setShowSmartFilter}
              showSmartFilter={showSmartFilter}
              buttonText={"Добавить заказ"}
              isArchive={true}
            />
            <AnimatePresence>
              {showSmartFilter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    overflow: "hidden",
                    marginLeft: 15,
                    marginRight: 15,
                  }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={ordersFilterFields}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={ordersTableHeader}
              body={currentCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              setShowEditSidebar={() => console.log(true)}
              activeTab={activeTab}
              handleShowActionMenuArchive={handleShowActionMenuArchive}
              setOnlyOneSelected={setOnlyOneSelected}
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {!showActionMenu && !showActionMenuArchive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Pagination
              countriesPerPage={countriesPerPage}
              totalCountries={ordersTableBody.length}
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
        {showActionMenuArchive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: "hidden" }}
          >
            <ArchiveActionMenu />
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
        {showSidebar && (
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
              isVisible={showSidebar}
              toggleSidebar={setShowSidebar}
              title={"Добавить/изменить тариф"}
            >
              <EditOrder />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Orders;
