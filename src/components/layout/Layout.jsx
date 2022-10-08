import { useStore, useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import burger from "../../assets/burger.svg";
import activeNewsIcon from "../../assets/icons8-rss-50 1.svg";
import notification from "../../assets/icons8-будильник-50 1.svg";
import searchIcon from "../../assets/icons8-поиск-50 1.svg";
import notActiveNewsIcon from "../../assets/not-active-news-icon.svg";
import userImage from "../../assets/Аватарка.svg";
import smallLogo from "../../assets/Логотип.svg";
import activeCrmIcon from "../../assets/active-crm-icon.svg";
import notActiveCrmIcon from "../../assets/icons8-crm-система-microsoft-dynamics-50 (1) 1.svg";
import activeDriverIcon from "../../assets/driver-active-icon.png";
import notActiveDriverIcon from "../../assets/driver-not-active-icon.png";
import activeCarIcon from "../../assets/car-active-icon.png";
import notActiveCarIcon from "../../assets/car-not-active-icon.png";
import activeTariffIcon from "../../assets/tariff-active-icon.png";
import notActiveTariffIcon from "../../assets/tarif-not-active-icon.png";
import successNotif from "../../assets/success_notif.svg";
import errorNotif from "../../assets/errorNotif.svg";
import authNotif from "../../assets/norif_auth.svg";
import deleteNotif from "../../assets/notid_delete.png";

import { Role } from "../../context";

import { useEffect, useState } from "react";

import "./layout.scss";
import {
  $isAuth,
  $user,
  checkAuthFx,
  logoutFx,
  logout,
} from "../../effector/user/authorization";
import useOutside from "../../hooks/useOutside";
import { API } from "../../http";
import { setNotification } from "../../store/userSlice.ts";
import Loader from "../loader/Loader";
import Moderation from "../moderation/Moderation";
import SidebarLink from "../sidebarLink/SidebarLink";

const Layout = () => {
  const user = useStore($user);
  const { role } = useStore($user);
  const { confirmed } = useStore($user);
  const { avatar: avatarFilename } = useStore($user);

  const { isShow, setIsShow, ref } = useOutside(false);
  const navigate = useNavigate();

  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false);

  const handleVisibility = () => {
    setIsVisibleSidebar(!isVisibleSidebar);
  };

  const openSidebar = () => {
    localStorage.setItem("sidebar", "open");
  };
  const closeSidebar = () => {
    localStorage.setItem("sidebar", "close");
  };

  useEffect(() => {
    if (localStorage.getItem("sidebar") === "open") {
      setIsVisibleSidebar(true);
    } else {
      setIsVisibleSidebar(false);
    }
  }, []);

  const clientLinks = [
    {
      title: "Лента активности",
      activeIcon: activeNewsIcon,
      notActiveIcon: notActiveNewsIcon,
      isVisibleSidebar,
      path: "/",
    },
    {
      title: "Заказать",
      activeIcon: activeCrmIcon,
      notActiveIcon: notActiveCrmIcon,
      isVisibleSidebar,
      path: "/order",
    },
    {
      title: "Список заказов",
      activeIcon: activeDriverIcon,
      notActiveIcon: notActiveDriverIcon,
      isVisibleSidebar,
      path: "/orders",
    },
  ];

  const links = [
    {
      title: "Лента активности",
      activeIcon: activeNewsIcon,
      notActiveIcon: notActiveNewsIcon,
      isVisibleSidebar,
      path: "/",
    },
    {
      title: "Заявки",
      activeIcon: activeCrmIcon,
      notActiveIcon: notActiveCrmIcon,
      isVisibleSidebar,
      path: "/requests",
    },
    {
      title: "Водители",
      activeIcon: activeDriverIcon,
      notActiveIcon: notActiveDriverIcon,
      isVisibleSidebar,
      path: "/drivers",
    },
    {
      title: "Машины",
      activeIcon: activeCarIcon,
      notActiveIcon: notActiveCarIcon,
      isVisibleSidebar,
      path: "/cars",
    },
    {
      title: "Тарифы",
      activeIcon: activeTariffIcon,
      notActiveIcon: notActiveTariffIcon,
      isVisibleSidebar,
      path: "/tariffs",
    },
    {
      title: "Клиенты",
      activeIcon: activeCrmIcon,
      notActiveIcon: notActiveCrmIcon,
      isVisibleSidebar,
      path: "/clients",
    },
  ];

  if (!confirmed && role === "m") {
    return <Moderation />;
  } else {
    return (
      <div>
        <div className={"wrap-0f-top-menu"}>
          <div className="menu-blocks">
            <div className="menu-block">
              <img src={smallLogo} alt="" className={"small-logo"} />
              <AnimatePresence>
                {isVisibleSidebar && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 195 }}
                    exit={{ width: 0 }}
                    style={{ overflow: "hidden" }}
                    transition={{ type: "Tween" }}
                  >
                    <div className={"full-logo"}>Трансфер</div>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                className={
                  isVisibleSidebar
                    ? " c-hamburger c-hamburger--htx is-active"
                    : "c-hamburger c-hamburger--htx"
                }
                onClick={async () => {
                  await handleVisibility();
                  if (isVisibleSidebar) {
                    closeSidebar();
                  } else if (!isVisibleSidebar) {
                    openSidebar();
                  }
                }}
              >
                <span>toggle menu</span>
              </button>
              <div className="global-search">
                <input
                  type="text"
                  className="global-search-input"
                  placeholder={"Глобальный поиск"}
                />
                <img src={searchIcon} alt="" className="search-icon" />
              </div>
            </div>
            <div className="menu-block">
              {/* <img src={notification} alt="" /> */}
              <div className={"username"}>
                {user.name} {user.surname} - <strong>{user.role}</strong>
              </div>
              <div
                className={"profile-image"}
                onClick={() => setIsShow(!isShow)}
              >
                <div className={"profile-image-layout-wrap"}>
                  <img src={`${API}${avatarFilename}`} alt="" />
                </div>
              </div>
              {isShow ? (
                <div className="user-info" ref={ref}>
                  <div className="user-info-image">
                    <img src={userImage} alt="" />
                  </div>
                  <div className="user-info-text">
                    <div className="user-name">
                      {user.name} - <strong>{user.role}</strong>
                    </div>
                    <div className="user-email">{user.email}</div>
                    <div className="userinfo-buttons">
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div>Мой профиль</div>
                      </Link>
                      <div onClick={logout}>Выход</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={"main-wrap"}>
          <div className="wrap-of-sidebar">
            <div>
              {role === "m" &&
                links.map((link, index) => {
                  return (
                    <SidebarLink
                      isVisibleSidebar={link.isVisibleSidebar}
                      title={link.title}
                      activeIcon={link.activeIcon}
                      notActiveIcon={link.notActiveIcon}
                      index={index}
                      key={index}
                      path={link.path}
                    />
                  );
                })}

              {role === "c" &&
                clientLinks.map((link, index) => {
                  return (
                    <SidebarLink
                      isVisibleSidebar={link.isVisibleSidebar}
                      title={link.title}
                      activeIcon={link.activeIcon}
                      notActiveIcon={link.notActiveIcon}
                      index={index}
                      key={index}
                      path={link.path}
                    />
                  );
                })}
            </div>
            <AnimatePresence>
              {isVisibleSidebar && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                  transition={{ type: "Tween" }}
                >
                  <div className="watermark">@ CRM система TT-Transfer</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
};
// };

export default Layout;
