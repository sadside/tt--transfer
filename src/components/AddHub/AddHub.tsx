import { AnimatePresence, motion } from "framer-motion";
import {
  createRouteWithHubThunk,
  removeHubRoute,
  setActiveHubRoute,
} from "../../store/tariffSlice";
import Loader from "../loader/Loader";
import Modal from "../modal/Modal";
import Button from "../ui/button/Button";
import styles from "./AddHub.module.scss";
import { useUnit } from "effector-react";
import { ChangeEvent, FormEvent } from "react";
import {
  $activeHub,
  $hubInputValue,
  $hubSuggestions,
  hubInputChanged,
  suggestionClicked,
} from "../../effector/tariffs/editTariff/editIntercityRoute/editIntercityRoute";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const AddHub = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.tariff.status);

  const hubInputValue = useUnit($hubInputValue);
  const hubSuggestions = useUnit($hubSuggestions);
  console.log(hubSuggestions);
  const activeHub = useUnit($activeHub);

  const creatingRoute = status === "creating city";

  const handleHubInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    hubInputChanged(e.target.value);
  };

  return (
    <>
      <div className={"tariffs-edit-sidebar-content-wrapper"}>
        <div className="tariffs-edit-sidebar-content-wrapper-header">
          <div className="edit-sidebar-tabs">
            <div className={`edit-sidebar-tab active`}>Глобальный адрес</div>
          </div>
        </div>
        <div className="tariffs-edit-sidebar-content-wrapper-form">
          <h2 className={styles.addCityTitle}>Создание маршрута с хабом.</h2>
          <form
            action=""
            className="tariffs-edit-sidebar-content-form"
            onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          >
            <label>
              <span className="required">*</span>Хаб
              <input
                type="text"
                className="tariff-data-input"
                placeholder={"Введите хаб"}
                onChange={handleHubInputChange}
                value={hubInputValue}
              />
              <AnimatePresence>
                {hubSuggestions.length > 0 && !activeHub && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "Tween" }}
                    style={{ zIndex: 100000000, position: "relative" }}
                  >
                    <div className={styles.citySelect}>
                      <ul>
                        {hubSuggestions.map((hub: any, index: number) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                suggestionClicked(hub);
                              }}
                            >
                              {hub}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </label>
            <Button
              text={"Создать маршрут"}
              style={{ marginTop: 30 }}
              typeSubmit={true}
              callback={() => {
                if (activeHub) dispatch(createRouteWithHubThunk(activeHub));
              }}
            />

            {creatingRoute && (
              <div style={{ marginTop: 120 }}>
                <Loader />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddHub;
