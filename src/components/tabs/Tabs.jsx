import "./tabs.scss";
import { useState } from "react";

const Tabs = ({ items, handleTabClick, style = {}, isShow = null }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-wrapper" style={{ ...style }}>
      {items.map((tab, index) => (
        <div key={index}>
          <div
            className={`tab-item ${activeTab === index && "active-tab"}`}
            onClick={() => {
              setActiveTab(index);
              handleTabClick(index);
            }}
          >
            {tab}
            {!isShow && (
              <div
                className={`tab-indicator ${
                  activeTab === index && "tab-active-indicator"
                }`}
              ></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
