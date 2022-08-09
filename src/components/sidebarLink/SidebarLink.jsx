import { AnimatePresence, motion } from "framer-motion";
import "../layout/layout.scss";
import { useNavigate, NavLink, useMatch } from "react-router-dom";
import { useState } from "react";
import CustomSidebarLink from "../customSidebarLink/CustomSidebarLink";

const SidebarLink = ({
  isVisibleSidebar,
  activeIcon,
  notActiveIcon,
  title,
  path,
}) => {
  const match = useMatch(path);

  return (
    <>
      <CustomSidebarLink to={path}>
        <div
          style={match ? { background: "rgba(149, 159, 173, 0.3)" } : null}
          onClick={() => {}}
          className={"sidebar-item"}
        >
          <div className="sidebar-icon-wrap">
            <img
              src={match ? activeIcon : notActiveIcon}
              alt=""
              className="sidebar-icon"
            />
            {match && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="active-indicator"></div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <AnimatePresence>
            {isVisibleSidebar && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                exit={{ width: 0 }}
                style={{ overflow: "hidden" }}
                transition={{ type: "Tween" }}
              >
                <div
                  className={"link-title"}
                  style={!match ? { color: "#B4BCC8" } : null}
                >
                  {title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CustomSidebarLink>
    </>
  );
};

export default SidebarLink;
