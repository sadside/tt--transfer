import "./customSelect.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface CustomSelectProps {
  isVisible: boolean;
  items: string[];
  setItem: (item: string) => void;
  setVisible: (bool: boolean) => void;
  setShowSidebar?: any;
  showAll?: boolean;
}

const CustomSelect = ({
  isVisible,
  items,
  setItem,
  setVisible,
  setShowSidebar,
  showAll = true,
}: CustomSelectProps) => {
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.25)",
              position: "relative",
              zIndex: 1000,
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "Tween" }}
          >
            <div className="select-items-wrap">
              {items.map((item) => (
                <div
                  className="select-item"
                  onClick={() => {
                    setItem(item);
                    setVisible(false);
                  }}
                >
                  {item}
                </div>
              ))}
              {showAll && (
                <div
                  className="select-item show-all"
                  onClick={() => {
                    setShowSidebar();
                    setVisible(false);
                  }}
                >
                  Показать все
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomSelect;
