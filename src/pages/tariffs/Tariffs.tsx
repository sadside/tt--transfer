import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActionMenu from "../../components/actionMenu/ActionMenu";
import AddGlobalAddress from "../../components/AddGlobalAddress/AddGlobalAddress";
import AddHub from "../../components/AddHub/AddHub";
import AddIntercityTariffSidebarContent from "../../components/addIntercityTariffSidebarContent/AddIntercityTariffSidebarContent";
import AddCity from "../../components/addIntercityTransferSidebarContent/AddCity";
import BlockHeader from "../../components/blockHeader/BlockHeader";
import EditSidebar from "../../components/editSidebar/EditSidebar";
import EditTariff from "../../components/editTariff/EditTariff";
import Loader from "../../components/loader/Loader";
import MainTableTariffs from "../../components/mainTableTariffs/MainTableTariffs";
import Pagination from "../../components/pagination/Pagination";
import SmartFilterTariff from "../../components/smartFilter/SmartFilterTariff";
import Tabs from "../../components/tabs/Tabs";
import HubInfo from "../../components/tariffsEditSidebarTransfersContent/HubInfo";
import { tariffsFilterData, tariffsTableBody, tariffsTabs } from "../../db";
import {
  $showAddCitySidebar,
  $showAddGlobalSidebar,
  $showAddHubSidebar,
  addCitySidebarChanged,
  addGlobalAddressSidebarChanged,
  addHubSidebarChanged,
  hubInputChanged,
  suggestionClicked,
} from "../../effector/tariffs/editTariff/editIntercityRoute/editIntercityRoute";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearTariff,
  getCarClassesThunk,
  getShortTariffs,
  setActiveGlobalAddress,
  setActivePage,
  setGlobalAddressInputValue,
  setShowAddCity,
  setShowAddTariffSidebar,
  setShowEditTariffSidebar,
  setShowZoneSidebar,
  setTariffsPerPage,
} from "../../store/tariffSlice";
import "./tariffs.scss";

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

  // const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPage = (value: number) => {
    dispatch(setActivePage(value));
  };

  const currentPage = useAppSelector((state) => state.tariff.activePage);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;

  const tariffs = useAppSelector((state) => state.tariff?.tariffs?.results);
  const showZoneSidebar = useAppSelector(
    (state) => state.tariff.showZoneSidebar
  );
  const count = useAppSelector((state) => state.tariff.tariffs?.count);

  const showAddSidebar = useAppSelector(
    (state) => state.tariff.showAddTariffSidebar
  );

  const showEditSidebar = useAppSelector(
    (state) => state.tariff.showEditTariffSidebar
  );

  // const showAddCity = useAppSelector((state) => state.tariff.showAddCity);

  const status = useAppSelector((state) => state.tariff.status);
  const tariffsPerPage = useAppSelector((state) => state.tariff.tariffsPerPage);

  const currentCountry = tariffsTableBody.slice(
    firstCountryIndex,
    lastCountryIndex
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getShortTariffs());
  }, [tariffsPerPage, currentPage]);

  useEffect(() => {
    dispatch(getCarClassesThunk());
    // dispatch(
    //   getShortTariffs({
    //     page: currentPage,
    //     limit: countriesPerPage,
    //   })
    // );
    return () => {
      dispatch(setShowZoneSidebar({ value: false }));
      dispatch(setShowAddTariffSidebar(false));
      dispatch(setShowAddCity({ value: false }));
    };
  }, []);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // dispatch(
    //   getShortTariffs({
    //     page: pageNumber,
    //     limit: countriesPerPage,
    //   })
    // );
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

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

  const showAddCity = useUnit($showAddCitySidebar);
  const showAddGlobalAddress = useUnit($showAddGlobalSidebar);
  const showAddHub = useUnit($showAddHubSidebar);

  useEffect(() => {
    dispatch(setGlobalAddressInputValue(""));
    dispatch(setActiveGlobalAddress(""));
  }, [showAddGlobalAddress]);

  useEffect(() => {
    if (!showAddHub) {
      hubInputChanged("");
      suggestionClicked("");
    }
  }, [showAddHub]);

  return (
    <>
      <Tabs items={tariffsTabs} handleTabClick={handleTabClick} />
      <div className="tariffs-wrapper">
        <BlockHeader
          showSmartFilter={showSmartFilter}
          FilterVisible={setShowSmartFilter}
          buttonText={"Добавить тариф"}
          callback={() => setShowEditSidebar(true)}
          resetFilter={() => {
            setSearchParams({});

            dispatch(getShortTariffs());
          }}
        />
        <AnimatePresence>
          {showSmartFilter && !showAddSidebar && !showEditSidebarIntercity && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: "hidden" }}
              transition={{ type: "Tween" }}
            >
              <SmartFilterTariff
                filterData={tariffsFilterData}
                closeSmartFilter={closeSmartFilter}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {status === "tariffs loading" ? (
          <Loader />
        ) : (
          <div>
            {tariffs?.length !== 0 ? (
              <MainTableTariffs />
            ) : (
              <div>По данному запросу тарифы отсутствуют.</div>
            )}
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
              countriesPerPage={tariffsPerPage}
              totalCountries={count}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              setCountriesPerPage={(count: number) =>
                dispatch(setTariffsPerPage(count))
              }
              setCurrentPage={setCurrentPage}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/*<AnimatePresence>*/}
      {/*  {showAddSidebar && (*/}
      {/*    <motion.div*/}
      {/*      initial={{ width: 0, opacity: 0 }}*/}
      {/*      animate={{ width: 1070, opacity: 1 }}*/}
      {/*      exit={{ width: 0, opacity: 0 }}*/}
      {/*      style={{*/}
      {/*        overflow: "hidden",*/}
      {/*        display: "flex",*/}
      {/*        position: "absolute",*/}
      {/*        top: 0,*/}
      {/*        right: 0,*/}
      {/*        zIndex: 1000,*/}
      {/*      }}*/}
      {/*      transition={{ type: "Tween" }}*/}
      {/*    >*/}
      {/*      <EditSidebar*/}
      {/*        isVisible={showEditSidebar}*/}
      {/*        toggleSidebar={setShowEditSidebar}*/}
      {/*      >*/}
      {/*        <TariffsEditSidebarContent*/}
      {/*          showTransfersSidebar={setShowEditSidebarTransfers}*/}
      {/*          setTest={setShowAddCitySidebar}*/}
      {/*        />*/}
      {/*      </EditSidebar>*/}
      {/*    </motion.div>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
      <AnimatePresence>
        {showEditSidebar && !showSmartFilter && (
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
              toggleSidebar={addCitySidebarChanged}
            >
              <AddCity />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddGlobalAddress && (
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
              isVisible={showAddGlobalAddress}
              toggleSidebar={addGlobalAddressSidebarChanged}
            >
              <AddGlobalAddress />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddHub && (
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
              isVisible={showAddHub}
              toggleSidebar={addHubSidebarChanged}
            >
              <AddHub />
            </EditSidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tariffs;
