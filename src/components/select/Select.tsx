import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import styles from "./Select.module.scss";
import reactangle from "../../assets/rec.svg";
import useOutside from "../../hooks/useOutside";

interface SelectProps {
  showSelect?: boolean;
  text?: string;
  setShowSelect: (bool: boolean) => void;
  setSelectItem: (item: any) => void;
  items: Array<any>;
  haveButton?: boolean;
  callback?: () => void;
}

const Select: FC<SelectProps> = ({
  showSelect,
  text,
  setShowSelect,
  setSelectItem,
  items,
  haveButton,
  callback,
}) => {

  const { ref, isShow, setIsShow } = useOutside(false)

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const selectItem = (item: any) => {
    setIsShow(false);
    setSelectItem(item.title);
  };

  return (
    <div  className={styles.wrap} >
      <div ref={ref} className={styles.select} onClick={handleClick}>
        <div className={styles.mainText}>{text}</div>
        <div className={styles.rightSide}>
          Выбрать
          <img src={reactangle} alt="" />
        </div>
      </div>
      <AnimatePresence>
        {isShow && (
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
