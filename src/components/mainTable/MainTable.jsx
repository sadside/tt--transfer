import "./mainTable.scss";
import { useEffect, useState } from "react";

const MainTable = ({
  headers,
  body,
  haveInputs = false,
  handleShowActionMenu,
  setShowEditSidebar,
  showSmartFilter = null,
  handleShowActionMenuArchive,
  activeTab,
  setOnlyOneSelected,
  isRequests = false,
  isArchive = true,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(body.length).fill(false)
  );
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [showTooltip, setShowTooltip] = useState(-1);

  useEffect(() => {
    console.log(checkedState, activeTab);

    if (activeTab === 0 || !isArchive) {
      let countTrueItems = 0;

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
    } else if (activeTab === 1 && isArchive) {
      checkedState.includes(true)
        ? handleShowActionMenuArchive(true)
        : handleShowActionMenuArchive(false);

      checkedState.includes(false) && setIsSelectAll(false);
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
            {haveInputs && (
              <th className="checkbox">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={isSelectAll}
                />
              </th>
            )}
            {headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="scroll-table-body">
        <table>
          <tbody>
            {body.map((item, pos) => (
              <tr
                key={pos}
                className={`${item?.status === "Выполнен" ? "green-tr" : ""} ${
                  item?.status === "Срочно" ? "red-tr" : ""
                }`}
              >
                {haveInputs && (
                  <td className="checkbox">
                    <input
                      type="checkbox"
                      onChange={() => {
                        handleOnChange(pos);
                      }}
                      checked={checkedState[pos]}
                    />
                  </td>
                )}
                {Object.values(item).map((value, index) => (
                  <td
                    key={index}
                    className={`${
                      index === 0 && !showSmartFilter && "first-element"
                    } ${
                      (value === "Свободен" && !showSmartFilter) ||
                      (value === "Постоянный" && !showSmartFilter) ||
                      (index === Object.values(item).length - 1 &&
                        value === "Активный")
                        ? "green"
                        : ""
                    } ${
                      (value === "Занят" && !showSmartFilter) ||
                      (value === "Обычный" && !showSmartFilter) ||
                      (index === Object.values(item).length - 1 &&
                        value === "Закрытый")
                        ? "red"
                        : ""
                    } ${
                      index === Object.values(item).length - 1 &&
                      isRequests &&
                      "client"
                    }`}
                    onClick={index === 0 ? setShowEditSidebar : undefined}
                    style={index === 0 ? { cursor: "pointer" } : {}}
                    onMouseEnter={
                      index === Object.values(item).length - 1
                        ? () => setShowTooltip(pos)
                        : null
                    }
                    onMouseLeave={
                      index === Object.values(item).length - 1
                        ? () => setShowTooltip(-1)
                        : null
                    }
                  >
                    {value}
                    {index === Object.values(item).length - 1 &&
                      showTooltip === pos &&
                      isRequests && (
                        <div className={"tooltip"}>
                          <p>Иванов Иван Иванович</p>
                          <p>+7 (123) 123-45-67</p>
                          <p>info@mail.ru</p>
                        </div>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
