import { YMaps } from "@pbe/react-yandex-maps";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import ArchiveActionMenu from "../../components/archiveActionMenu/ArchiveActionMenu";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import Calculator from "../../components/calculator/Calculator";
import CarAndDriver from "../../components/carAndDriver/CarAndDriver";
import EditRequest from "../../components/editRequest/EditRequest";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import MainTable from "../../components/mainTable/MainTable";
import Pagination from "../../components/pagination/Pagination";
import Routes from "../../components/routes/Routes";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import rightArrow from "../../assets/rightArrow.svg";

import "./request.scss";
import {
  driversSmartFilterFields,
  requestsTableBody,
  requestsTableHeaders,
  requestsTabs,
} from "../../db";

const Request = () => {
  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);
  const [showActionMenuArchive, setShowActionMenuArchive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDriverAndCarSidebar, setShowDriverAndCarSidebar] = useState(false);

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const currentCountry = requestsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };

  useEffect(() => {
    setShowActionMenuArchive(false);
    setShowActionMenu(false);
  }, [activeTab]);

  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const onSelectAll = () => {
    setSelectAll(true);
  };
  const offSelectAll = () => {
    setSelectAll(false);
  };

  const filterData = [
    {
      title: "Номер",
      placeholder: "Номер",
      width: 120,
    },
    {
      title: "Дата",
      placeholder: "Дата",
      width: 100,
    },
    {
      title: "Время",
      placeholder: "Время",
      width: 70,
    },
    {
      title: "Статус",
      placeholder: "Cтатус",
      width: 160,
    },
    {
      title: "Сумма клиента",
      placeholder: "Cумма",
      width: 120,
    },
    {
      title: "Сумма водителя",
      placeholder: "Cумма",
      width: 120,
    },
    {
      title: "Пункт отправления",
      placeholder: "Пункт отправления",
      width: 150,
    },
    {
      title: "Конечный пункт",
      placeholder: "Конечный пункт",
      width: 150,
    },
    {
      title: "Заказчики",
      placeholder: "Заказчика",
      width: 160,
    },
    {
      title: "Водители",
      placeholder: "Водитель",
      width: 160,
    },
    {
      title: "Машина",
      placeholder: "Машина",
      width: 160,
    },
  ];

  return (
    <>
      <Tabs items={requestsTabs} handleTabClick={handleTabClick} />
      <div
        className={`requests-wrap ${
          (activeTab === 2 || activeTab === 3) && "active-tab-requests-wrap"
        }`}
      >
        {activeTab === 0 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить заказ"}
              callback={() => setShowSidebar(true)}
            />
            <AnimatePresence>
              {showSmartFilter && !showSidebar && !showDriverAndCarSidebar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={filterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              body={currentCountry}
              headers={requestsTableHeaders}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              activeTab={activeTab}
              setOnlyOneSelected={setOnlyOneSelected}
              setShowEditSidebar={setShowSidebar}
              isRequests={true}
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить заказ"}
              isArchive
            />
            <AnimatePresence>
              {showSmartFilter && !showSidebar && !showDriverAndCarSidebar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={filterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              body={currentCountry}
              headers={requestsTableHeaders}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              activeTab={activeTab}
              handleShowActionMenuArchive={setShowActionMenuArchive}
              isRequests={true}
            />
          </>
        )}
        {activeTab === 2 && <Calculator />}
        {activeTab === 3 && <Routes />}
      </div>
      {activeTab !== 2 && activeTab !== 3 && (
        <>
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
            {!showActionMenu && !showActionMenuArchive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <Pagination
                  countriesPerPage={countriesPerPage}
                  totalCountries={requestsTableBody.length}
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
                  zIndex: 2200,
                }}
                transition={{ type: "Tween" }}
              >
                <EditSidebar
                  isVisible={showSidebar}
                  toggleSidebar={setShowSidebar}
                  title={"Добавить/изменить тариф"}
                  isGray={true}
                >
                  <EditRequest
                    setShowCarAndDriver={setShowDriverAndCarSidebar}
                  />
                </EditSidebar>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showDriverAndCarSidebar && (
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
                  isVisible={showDriverAndCarSidebar}
                  toggleSidebar={setShowDriverAndCarSidebar}
                  title={"Добавить/изменить тариф"}
                  isGray={true}
                >
                  <CarAndDriver />
                </EditSidebar>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Request;
