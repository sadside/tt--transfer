import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AddCar from "../../components/addCar/AddCar";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import ArchiveActionMenu from "../../components/archiveActionMenu/ArchiveActionMenu";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import CarsTable from "../../components/carsTable/CarsTable";
import EditCar from "../../components/editCar/EditCar";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import Pagination from "../../components/pagination/Pagination";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import pts from "../../assets/pts.svg";

import {
  carsFilterData,
  carsTableBody,
  carsTableHeaders,
  carsTabs,
} from "../../db";
import "./cars.scss";
import useOutside from "../../hooks/useOutside";

const Cars = () => {
  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showActionMenuArchive, setShowActionMenuArchive] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showEditCar, setShowEditCar] = useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);

  const { ref, isShow, setIsShow } = useOutside(false);

  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const currentCountry = carsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleShowActionMenu = (value) => {
    setShowActionMenu(value);
  };

  const handleShowActionMenuArchive = (value) => {
    setShowActionMenuArchive(value);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  const handlePhotoClick = () => {
    setIsShow(true);
  };

  useEffect(() => {
    setShowActionMenuArchive(false);
    setShowActionMenu(false);
  }, [activeTab]);

  return (
    <>
      <Tabs items={carsTabs} handleTabClick={handleTabClick} isShow={isShow} />
      <div className="cars-wrapper">
        {activeTab === 0 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить машину"}
              callback={() => setShowAddCar(true)}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddCar && !showEditCar && (
                <motion.divw
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={carsFilterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.divw>
              )}
            </AnimatePresence>
            <CarsTable
              headers={carsTableHeaders}
              body={currentCountry}
              handleShowActionMenu={handleShowActionMenu}
              handleShowEditSidebar={() => setShowEditCar(true)}
              activeTab={activeTab}
              setOnlyOneSelected={setOnlyOneSelected}
            />
          </>
        )}
        {activeTab === 1 && (
          <>
            <BlockHeader
              showSmartFilter={showSmartFilter}
              FilterVisible={setShowSmartFilter}
              buttonText={"Добавить машину"}
              callback={() => setShowAddCar(true)}
              isArchive={true}
            />
            <AnimatePresence>
              {showSmartFilter && !showAddCar && !showEditCar && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <SmartFilterTariff
                    filterData={carsFilterData}
                    closeSmartFilter={closeSmartFilter}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <CarsTable
              activeTab={activeTab}
              headers={carsTableHeaders}
              body={currentCountry}
              handleShowActionMenu={handleShowActionMenu}
              handleShowActionMenuArchive={handleShowActionMenuArchive}
              handleShowEditSidebar={() => setShowEditCar(true)}
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
              totalCountries={carsTableBody.length}
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
        {showAddCar && !isShow && (
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
              isVisible={showAddCar}
              toggleSidebar={setShowAddCar}
              title={"Добавить/изменить тариф"}
            >
              <AddCar handlePhotoClick={handlePhotoClick} />
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
              <img src={pts} alt="" width={1000} ref={ref} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditCar && !isShow && (
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
            <EditSidebar isVisible={showEditCar} toggleSidebar={setShowEditCar}>
              <EditCar handlePhotoClick={handlePhotoClick} />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cars;
