import { FC } from "react";
import { removeAdditionalRace } from "../../store/calculatorSlice";
import { useAppDispatch } from "../../store/hooks";
import styles from "./AdditionalRace.module.scss";
import rubish from "../../assets/deleteIcon.svg";

export type AdditionalRaceProps = {
  value: string;
  id: string;
};

const AdditionalRace: FC<AdditionalRaceProps> = ({ value, id }) => {
  const dispatch = useAppDispatch();

  const deleteRace = () => {
    dispatch(removeAdditionalRace(id));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.raceContent}>{value}</div>
      <div className={styles.deleteRace} onClick={deleteRace}>
        <img src={rubish} alt="" />
      </div>
    </div>
  );
};

export default AdditionalRace;
