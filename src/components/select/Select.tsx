import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useAppDispatch } from "../../store/hooks";
import { IFullHub } from "../../types/types";
import styles from "./Select.module.scss";
import reactangle from "../../assets/rec.svg";
import { setActiveFromHub } from "../../store/calculatorSlice";

interface SelectProps {
  showSelect?: boolean;
  text?: string;
  setShowSelect: (bool: boolean) => void;
  setSelectItem?: (item: any) => void;
  items: Array<any>;
  haveButton?: boolean;
  callback?: () => void;
  secondCallback?: (item: any) => void;
}

const Select: FC<SelectProps> = ({
  showSelect,
  text,
  setShowSelect,
  setSelectItem,
  items,
  haveButton,
  callback,
  secondCallback,
}) => {
  const handleClick = () => {
    setShowSelect(!showSelect);
  };

  const selectItem = (item: any) => {
    setShowSelect(false);
    if (setSelectItem) {
      setSelectItem(item.title);
    }
    if (secondCallback) {
      secondCallback(item);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.select} onClick={handleClick}>
        <div className={styles.mainText}>{text}</div>
        <div className={styles.rightSide}>
          Выбрать
          <img src={reactangle} alt="" />
        </div>
      </div>
      <AnimatePresence>
        {showSelect && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "Tween" }}
            style={{ overflow: "hidden", zIndex: 1000 }}
          >
            <div className={styles.suggestionsWrap}>
              <ul>
                {items.map((item, index) => {
                  return (
                    <li key={index} onClick={() => selectItem(item)}>
                      {item.title}
                    </li>
                  );
                })}
                {haveButton && (
                  <li className={styles.button} onClick={callback}>
                    Добавить хаб
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
