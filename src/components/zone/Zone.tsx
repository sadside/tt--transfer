import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteZoneThunk, editZoneThunk } from "../../store/zoneSlice";

import styles from "./Zone.module.scss";

interface ZoneProps {
  color: string;
  id: number | undefined;
  coordinates: string;
  region?: string;
  city?: string;
}

const Zone: React.FC<ZoneProps> = ({
  color,
  id,
  coordinates,
  region,
  city,
}) => {
  let zoneText;

  switch (color) {
    case "green":
      zoneText = "Зеленая зона";
      break;
    case "blue":
      zoneText = "Синяя зона";
      break;
    case "red":
      zoneText = "Красная зона";
      break;
    case "yellow":
      zoneText = "Желтая зона";
      break;
  }

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [activeColor, setActiveColor] = useState("green");
  const [newCoords, setNewCoords] = useState(JSON.stringify(coordinates));

  const zoneColor = classNames([styles.selectZoneIndicator], {
    [styles.green]: activeColor === "green",
    [styles.blue]: activeColor === "blue",
    [styles.red]: activeColor === "red",
    [styles.yellow]: activeColor === "yellow",
  });

  const zoneIndicatorColor = classNames([styles.zoneIndicator], {
    [styles.green]: color === "green",
    [styles.blue]: color === "blue",
    [styles.red]: color === "red",
    [styles.yellow]: color === "yellow",
  });

  const removeZone = () => {
    // @ts-ignore
    dispatch(deleteZoneThunk(id));
  };

  const zoneEditing = () => {
    // @ts-ignore
    dispatch(
      // @ts-ignore
      editZoneThunk({
        id,
        coordinates: JSON.parse(newCoords),
        color,
      })
    );
    setEdit(false);
  };

  return (
    <div className={styles.zoneWrap}>
      {!edit && (
        <div className={styles.zoneColor}>
          <div className={zoneIndicatorColor}></div>
        </div>
      )}

      {edit ? (
        <div className={styles.coordsInputWrap}>
          <input
            type="text"
            value={newCoords}
            onChange={(e) => setNewCoords(e.target.value)}
            className={styles.editZoneInput}
          />
        </div>
      ) : (
        <div className={styles.zoneNumber}>{zoneText}</div>
      )}
      {edit ? (
        <div className={styles.editZoneBtn} onClick={zoneEditing}>
          Сохранить
        </div>
      ) : (
        <div className={styles.editZoneBtn} onClick={() => setEdit(true)}>
          Редактировать
        </div>
      )}
      <div className={styles.deleteZoneBtn} onClick={removeZone}>
        {/*<img src={deleteZoneIcon} alt="Удалить" height={30} />*/}
        Удалить
      </div>
    </div>
  );
};

export default Zone;
