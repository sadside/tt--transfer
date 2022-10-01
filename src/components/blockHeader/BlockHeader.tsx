import "./blockHeader.scss";
import { useSearchParams } from "react-router-dom";
import { API, API_URL } from "../../http";
import Button from "../ui/button/Button";
import searchIcon from "../../assets/find.svg";
import filterIcon from "../../assets/smart-filter.svg";
import excel from "../../assets/excel.svg";

interface BlockHeaderProps {
  FilterVisible: (bool: boolean) => void;
  showSmartFilter: boolean;
  buttonText: string;
  callback: () => void;
  isArchive?: boolean;
  resetFilter: () => void;
}

const BlockHeader = ({
  FilterVisible,
  showSmartFilter,
  buttonText,
  callback,
  isArchive = false,
  resetFilter,
}: BlockHeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const haveSearchParams =
    searchParams.get("region") ||
    searchParams.get("type") ||
    searchParams.get("city");

  const downloadDocument = async (e: any) => {
    e.stopPropagation();

    const response = await fetch(`${API_URL}tariffs/export-tariffs/`, {
      headers: {
        Authorization: `accessToken ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = response.headers.get("filename") || "table";

      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
  return (
    <div className="header-block-wrap">
      <div className={"left-wrap"}>
        <div className={"header-block-input-wrap"}>
          <form action="">
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
        {haveSearchParams && (
          <div className="smart-filter-reset" onClick={resetFilter}>
            <div className="smart-filter-columns">
              <img src={filterIcon} alt="" />
              <div>Сбросить фильтр</div>
            </div>
          </div>
        )}
      </div>
      <div className={"left-wrap"}>
        <div className="excel-upload" onClick={downloadDocument}>
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
