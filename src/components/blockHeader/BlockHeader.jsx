import "./blockHeader.scss";
import Button from "../ui/button/Button";
import searchIcon from "../../assets/find.svg";
import filterIcon from "../../assets/smart-filter.svg";
import excel from "../../assets/excel.svg";

const BlockHeader = ({
  FilterVisible,
  showSmartFilter,
  buttonText,
  callback,
  isArchive = false,
}) => {
  return (
    <div className="header-block-wrap">
      <div className={"left-wrap"}>
        <div className={"header-block-input-wrap"}>
          <form action="src/components/blockHeader/BlockHeader">
            <input
              type="text"
              className="header-block-input"
              placeholder={"Поиск"}
            />
          </form>
          <img src={searchIcon} alt="" className="search-icon" />
        </div>
        <div
          className="smart-filter"
          onClick={() => {
            FilterVisible(!showSmartFilter);
          }}
        >
          <div className="smart-filter-columns">
            <img src={filterIcon} alt="" />
            <div>Умный фильтр</div>
          </div>
        </div>
      </div>
      <div className={"left-wrap"}>
        <div className="excel-upload">
          <div className="smart-filter-columns">
            <img src={excel} alt="" />
            <div>Выгрузить в Excel</div>
          </div>
        </div>
        {isArchive ? null : (
          <Button text={buttonText} width={180} callback={callback} />
        )}
      </div>
    </div>
  );
};

export default BlockHeader;
