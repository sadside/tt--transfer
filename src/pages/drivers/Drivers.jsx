import "./drivers.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import driverLicence from "../../assets/driverLicense.png";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import AddDriver from "../../components/addDriver/AddDriver";
import ArchiveActionMenu from "../../components/archiveActionMenu/ArchiveActionMenu";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditDriver from "../../components/editDriver/EditDriver";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import MainTable from "../../components/mainTable/MainTable";
import Pagination from "../../components/pagination/Pagination";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import {
  driversSmartFilterFields,
  driversTabs,
  driversTableHeader,
  driversTableBody,
} from "../../db";
import useOutside from "../../hooks/useOutside";

const Drivers = () => {
  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [activeDriversTab, setActiveDriversTab] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showActionMenuArchive, setShowActionMenuArchive] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [showEditDriver, setShowEditDriver] = useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);

  const { ref, isShow, setIsShow } = useOutside(false);

  const handleShowActionMenuArchive = (value) => {
    setShowActionMenuArchive(value);
  };

  useEffect(() => {
    setShowActionMenuArchive(false);
    setShowActionMenu(false);
  }, [activeDriversTab]);

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };
  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  const handleTabClick = (index) => {
    setActiveDriversTab(index);
  };

  console.log(activeDriversTab);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const currentCountry = driversTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handlePhotoClick = () => {
    setIsShow(true);
  };

  return (
    <>
      <Tabs items={driversTabs} handleTabClick={handleTabClick} />
      <div className="drivers-wrapper">
        {activeDriversTab === 0 && (
          <>
            <BlockHeader
              FilterVisible={setShowSmartFilter}
              showSmartFilter={showSmartFilter}
              buttonText={"Добавить водителя"}
              callback={() => setShowAddDriver(true)}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddDriver && !showEditDriver && (
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
                    filterData={driversSmartFilterFields}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={driversTableHeader}
              body={currentCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              setShowEditSidebar={() => setShowEditDriver(true)}
              activeTab={activeDriversTab}
              handleShowActionMenuArchive={handleShowActionMenuArchive}
              setOnlyOneSelected={setOnlyOneSelected}
            />
          </>
        )}
        {activeDriversTab === 1 && (
          <>
            <BlockHeader
              FilterVisible={setShowSmartFilter}
              showSmartFilter={showSmartFilter}
              buttonText={"Добавить водителя"}
              callback={() => setShowAddDriver(true)}
              isArchive={true}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddDriver && !showEditDriver && (
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
                    filterData={driversSmartFilterFields}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <MainTable
              headers={driversTableHeader}
              body={currentCountry}
              haveInputs={true}
              handleShowActionMenu={handleShowActionMenu}
              showSmartFilter={showSmartFilter}
              setShowEditSidebar={() => setShowEditDriver(true)}
              activeTab={activeDriversTab}
              handleShowActionMenuArchive={handleShowActionMenuArchive}
            />
          </>
        )}
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
        {!showActionMenu && !showActionMenuArchive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Pagination
              countriesPerPage={countriesPerPage}
              totalCountries={driversTableBody.length}
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
        {showAddDriver && !isShow && (
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
              isVisible={showAddDriver}
              toggleSidebar={setShowAddDriver}
              title={"Добавить/изменить тариф"}
            >
              <AddDriver handlePhotoClick={() => setIsShow(true)} />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 121 }}
          >
            <div className="zoom-in-image">
              <img src={driverLicence} alt="" width={1000} ref={ref} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditDriver && !isShow && (
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
              isVisible={showEditDriver}
              toggleSidebar={setShowEditDriver}
            >
              <EditDriver />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drivers;
