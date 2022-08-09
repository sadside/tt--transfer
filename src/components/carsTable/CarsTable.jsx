import "./carsTable.scss";
import { useEffect, useState, memo } from "react";

const CarsTable = ({
  headers,
  body,
  handleShowActionMenu,
  handleShowEditSidebar = null,
  handleShowActionMenuArchive = null,
  activeTab,
  setOnlyOneSelected,
}) => {
  const [showTooltip, setShowTooltip] = useState(0);
  const [checkedState, setCheckedState] = useState(
    new Array(body.length).fill(false)
  );
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    let countTrueItems = 0;

    if (activeTab === 0) {
      checkedState.includes(true)
        ? handleShowActionMenu(true)
        : handleShowActionMenu(false);

      checkedState.forEach((item) => {
        if (item) countTrueItems += 1;
      });

      countTrueItems === 1
        ? setOnlyOneSelected(true)
        : setOnlyOneSelected(false);

      checkedState.includes(false) && setIsSelectAll(false);
    } else if (activeTab === 1) {
      checkedState.includes(true)
        ? handleShowActionMenuArchive(true)
        : handleShowActionMenuArchive(false);
    }
  }, [checkedState]);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  const selectAll = () => {
    if (checkedState.includes(false)) {
      setCheckedState(new Array(body.length).fill(true));
      setIsSelectAll(true);
    } else {
      setCheckedState(new Array(body.length).fill(false));
      setIsSelectAll(false);
    }
  };

  return (
    <div className="scroll-table">
      <table>
        <thead>
          <tr>
            <th className="checkbox">
              <input
                type="checkbox"
                onChange={selectAll}
                checked={isSelectAll}
              />
            </th>
            {headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="scroll-table-body">
        <table>
          <tbody>
            {body.map((item, index) => (
              <tr key={index}>
                <td className="checkbox">
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleOnChange(index);
                    }}
                    checked={checkedState[index]}
                  />
                </td>
                <td className="first-element" onClick={handleShowEditSidebar}>
                  {item.car}
                </td>
                <td>{item.carClass}</td>
                <td>{item.carNumber}</td>
                <td>{item.city}</td>
                <td>{item.driver}</td>
                <td>{item.phone}</td>
                <td
                  className={item.status === "Свободен" ? "green" : "red"}
                  onMouseEnter={() => setShowTooltip(index)}
                  onMouseLeave={() => setShowTooltip(0)}
                >
                  {item.status}
                  {item.status === "Занят" && showTooltip === index && (
                    <div className={"tooltip"}>
                      <p>Автомобиль занят</p>
                      <p>До 01.07.2022</p>
                      <p>Освободиться в 16:00</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(CarsTable);
