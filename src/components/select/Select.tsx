import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import useOutside from "../../hooks/useOutside";
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
  const { ref, isShow, setIsShow } = useOutside(false);

  const handleClick = () => {
    if (items.length > 0) setIsShow(!showSelect);
  };

  const selectItem = (item: any) => {
    setIsShow(false);
    if (setSelectItem) {
      setSelectItem(item.title);
    }
    if (secondCallback) {
      secondCallback(item);
    }
  };

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.select} onClick={handleClick}>
        <div className={styles.mainText}>{text}</div>
        <div className={styles.rightSide}>
          Выбрать
          <img src={reactangle} alt="" />
        </div>
      </div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "Tween" }}
            style={{
              zIndex: 99999,
              position: "absolute",
              top: 50,
              left: 0,
              width: "100%",
              background: "#E8E8E8",
              boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.25)",
              marginTop: 10,
              overflowY: "auto",
              maxHeight: 200,
              borderRadius: 3,
            }}
          >
            <div className={styles.suggestionsWrap1}>
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
