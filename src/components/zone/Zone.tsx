import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Interface } from "readline";
import { deleteZone, editZone } from "../../store/zoneSlice";

import styles from "./Zone.module.scss";

interface ZoneProps {
  type: string;
  id: number;
  coordinates: string;
}

const Zone: React.FC<ZoneProps> = ({ type, id, coordinates }) => {
  let zoneText;

  switch (type) {
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
  const [newCoords, setNewCoords] = useState(coordinates);

  const zoneColor = classNames([styles.selectZone], {
    [styles.green]: activeColor === "green",
    [styles.blue]: activeColor === "blue",
    [styles.red]: activeColor === "red",
    [styles.yellow]: activeColor === "yellow",
  });

  const zoneIndicatorColor = classNames([styles.zoneIndicator], {
    [styles.green]: type === "green",
    [styles.blue]: type === "blue",
    [styles.red]: type === "red",
    [styles.yellow]: type === "yellow",
  });

  const removeZone = () => {
    dispatch(deleteZone(id));
  };

  const zoneEditing = () => {
    dispatch(editZone({ id, coordinates: newCoords, type: activeColor }));
    setEdit(false);
  };

  return (
    <div className={styles.zoneWrap}>
      {!edit && (
        <div className={styles.zoneColor}>
          <div className={zoneIndicatorColor}></div>
        </div>
      )}
      {edit && (
        <div>
          <div
            className={zoneColor}
            onClick={() => setShowColorSelect(!showColorSelect)}
          >
            Выберите цвет зоны
            {showColorSelect && (
              <div className={styles.selectZoneItem}>
                <div
                  className={styles.colorItem}
                  onClick={() => setActiveColor("green")}
                >
                  <div className={styles.green}></div>
                </div>
                <div
                  className={styles.colorItem}
                  onClick={() => setActiveColor("blue")}
                >
                  <div className={styles.blue}></div>
                </div>
                <div
                  className={styles.colorItem}
                  onClick={() => setActiveColor("red")}
                >
                  <div className={styles.red}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {edit ? (
        <div className={styles.coordsInputWrap}>
          <input
            type="text"
            value={newCoords}
            onChange={(e) => setNewCoords(e.target.value)}
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
        Удалить
      </div>
    </div>
  );
};

export default Zone;
