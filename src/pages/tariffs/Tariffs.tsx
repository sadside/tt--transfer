import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { log } from "util";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import AddIntercityTariffSidebarContent from "../../components/addIntercityTariffSidebarContent/AddIntercityTariffSidebarContent";
import AddCity from "../../components/addIntercityTransferSidebarContent/AddCity";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import EditTariff from "../../components/editTariff/EditTariff";
import Loader from "../../components/loader/Loader";
import MainTable from "../../components/mainTable/MainTable";
import MainTableTariffs from "../../components/mainTableTariffs/MainTableTariffs";
import Pagination from "../../components/pagination/Pagination";
import SmartFilter from "../../components/smartFilter/SmartFilter";
import Tabs from "../../components/tabs/Tabs";
import "./tariffs.scss";
import TariffsEditSidebarContent from "../../components/tariffsEditSidebarContent/TariffsEditSidebarContent";
import HubInfo from "../../components/tariffsEditSidebarTransfersContent/HubInfo";
import {
  tariffsFilterData,
  tariffsTableBody,
  tariffsTableHeaders,
  tariffsTabs,
} from "../../db";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearTariff,
  getCarClassesThunk,
  getShortTariffs,
  getTariffByIdThunk,
  setShowAddCity,
  setShowAddTariffSidebar,
  setShowEditTariffSidebar,
  setShowZoneSidebar,
} from "../../store/tariffSlice";

const Tariffs = () => {
  const dispatch = useAppDispatch();

  const [showSmartFilter, setShowSmartFilter] = useState(false);
  const [activeTariffTab, setActiveTariffTab] = useState(0);
  const [showActionMenu, setShowActionMenu] = useState(false);
  // const [test, setTest] = useState(false);
  const [showEditSidebarIntercity, setShowEditSidebarIntercity] =
    useState(false);
  const [onlyOneSelected, setOnlyOneSelected] = useState(false);
  //Pagination

  const setShowAddCitySidebar = (value: boolean) => {
    dispatch(
      setShowAddCity({
        value,
      })
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const tariffs = useAppSelector((state) => state.tariff.tariffs);
  const showZoneSidebar = useAppSelector(
    (state) => state.tariff.showZoneSidebar
  );

  const showAddSidebar = useAppSelector(
    (state) => state.tariff.showAddTariffSidebar
  );

  const showEditSidebar = useAppSelector(
    (state) => state.tariff.showEditTariffSidebar
  );

  const showAddCity = useAppSelector((state) => state.tariff.showAddCity);

  const status = useAppSelector((state) => state.tariff.status);

  const currentCountry = tariffsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  useEffect(() => {
    dispatch(getCarClassesThunk());
    dispatch(getShortTariffs());
    return () => {
      dispatch(setShowZoneSidebar({ value: false }));
      dispatch(setShowAddTariffSidebar(false));
      dispatch(setShowAddCity({ value: false }));
    };
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  const handleShowActionMenu = (value: any) => {
    setShowActionMenu(value);
  };

  const handleTabClick = (index: number) => {
    setActiveTariffTab(index);
  };

  const setShowEditSidebarTransfers = (value: boolean, index: number) => {
    dispatch(setShowZoneSidebar({ value, index }));
  };

  const closeSmartFilter = () => {
    setShowSmartFilter(false);
  };

  const setShowAddSidebar = (value: boolean) => {
    dispatch(setShowAddTariffSidebar(value));
    dispatch(clearTariff());
  };

  const setShowEditSidebar = (value: boolean) => {
    dispatch(setShowEditTariffSidebar(value));
    dispatch(clearTariff());
  };

  return (
    <>
      <Tabs items={tariffsTabs} handleTabClick={handleTabClick} />
      <div className="tariffs-wrapper">
        <BlockHeader
          showSmartFilter={showSmartFilter}
          FilterVisible={setShowSmartFilter}
          buttonText={"Добавить тариф"}
          callback={() => setShowAddSidebar(true)}
        />
        <AnimatePresence>
          {showSmartFilter &&
            !showAddSidebar &&
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
        {/*<MainTable*/}
        {/*  headers={tariffsTableHeaders}*/}
        {/*  body={currentCountry}*/}
        {/*  haveInputs={true}*/}
        {/*  handleShowActionMenu={handleShowActionMenu}*/}
        {/*  setShowEditSidebar={() => setShowEditSidebar(true)}*/}
        {/*  activeTab={0}*/}
        {/*  setOnlyOneSelected={setOnlyOneSelected}*/}
        {/*  handleShowActionMenuArchive={() => console.log("show")}*/}
        {/*/>*/}
        {status == "tariffs loading" ? (
          <Loader />
        ) : (
          <div>
            {/*{tariffs*/}
            {/*  .map((tariff) => (*/}
            {/*    <div onClick={() => dispatch(getTariffByIdThunk(tariff.id))}>*/}
            {/*      {tariff.title}*/}
            {/*    </div>*/}
            {/*  ))*/}
            {/*  .reverse()}*/}
            <MainTableTariffs />
          </div>
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
        {showAddSidebar && (
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
              isVisible={showAddSidebar}
              toggleSidebar={setShowAddSidebar}
            >
              <TariffsEditSidebarContent
                showTransfersSidebar={setShowEditSidebarTransfers}
                setTest={setShowAddCitySidebar}
              />
            </EditSidebar>
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
            >
              <EditTariff />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showZoneSidebar && (
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
              isVisible={showZoneSidebar}
              toggleSidebar={setShowEditSidebarTransfers}
            >
              <HubInfo />
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
            >
              <AddIntercityTariffSidebarContent
                setTest={setShowAddCitySidebar}
              />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddCity && (
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
              isVisible={showAddCity}
              toggleSidebar={setShowAddCitySidebar}
            >
              <AddCity />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tariffs;
