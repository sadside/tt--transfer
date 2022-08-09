import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import countPages from "../../assets/countPage.svg";
import nextPageIcon from "../../assets/nextPage.svg";
import prevPageIcon from "../../assets/prevPage.svg";
import "./pagination.scss";
import useOutside from "../../hooks/useOutside";

const Pagination = ({
  countriesPerPage,
  totalCountries,
  paginate,
  nextPage,
  prevPage,
  currentPage,
  setCurrentPage,
  setCountriesPerPage,
}) => {
  const [showSelectCountCountries, setShowSelectCountCountries] =
    useState(false);

  const { ref, isShow, setIsShow } = useOutside(false);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = (page) => {
    setCountriesPerPage(page);
  };

  return (
    <>
      <div className="pagination-wrap">
        <div className="count-pages" onClick={() => setIsShow(true)}>
          <img src={countPages} alt="" />
          <span>{countriesPerPage}</span>
        </div>
        <div className="pagination-text">Список страниц</div>
        <div
          onClick={() => {
            if (
              currentPage > 1 &&
              currentPage <= Math.ceil(totalCountries / countriesPerPage)
            ) {
              prevPage();
            }
          }}
          className="prev-page-button pagination-button"
        >
          <img src={prevPageIcon} alt="" />
        </div>
        {pageNumbers.map((number) => (
          <div
            className={`page-button pagination-button ${
              currentPage === number && "active-pagination-button"
            }`}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </div>
        ))}
        <div
          onClick={() => {
            if (
              currentPage >= 1 &&
              currentPage < Math.ceil(totalCountries / countriesPerPage)
            ) {
              nextPage();
            }
          }}
          className="next-page-button pagination-button"
        >
          <img src={nextPageIcon} alt="" />
        </div>
      </div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "relative" }}
          >
            <div className="select-count-countries" ref={ref}>
              {[10, 20, 30, 50, 100].map((number) => (
                <div
                  className="select-count-countries-item"
                  onClick={() => {
                    changePage(number);
                    setIsShow(false);
                    setCurrentPage(1);
                  }}
                  key={number}
                >
                  {number}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Pagination;
