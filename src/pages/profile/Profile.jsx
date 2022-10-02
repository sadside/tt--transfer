import { useStore } from "effector-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import profile from "../../assets/profile-avatar.svg";
import activeSettings from "../../assets/settings.svg";
import changePassword from "../../assets/change-password.svg";
import logoutIcon from "../../assets/logout.svg";
import addPhoto from "../../assets/add-photo-profile.svg";
import activeLogout from "../../assets/icons8-выход-10.png";
import activeChangePassword from "../../assets/active-change-password.svg";
import activeAddPhoto from "../../assets/active-add-photo.svg";
import settings from "../../assets/set.svg";
import "./profile.scss";
import ListEmployees from "../../components/listEmployees/ListEmployees";
import ChangePassword from "../../components/profileAccount/ChangePassword";
import ProfileAccount from "../../components/profileAccount/ProfileAccount";
import UploadProfileImages from "../../components/uploadProfileImages/UploadProfileImages";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/profile-avatar.svg";
import { $user } from "../../effector/user/authorization";
import { API } from "../../http";
import { logout } from "../../store/userSlice.ts";
import activeUserGroup from "../../assets/icons8-user-account-100 (1).png";
import userGroup from "../../assets/icons8-user-account-100.png";

const Profile = () => {
  const [activeLink, setActiveLink] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const avatarFilename = useSelector((state) => state.user.user.avatar);
  const { avatar: avatarFilename } = useStore($user);
  return (
    <>
      <div className="profile-wrap">
        <div className="profile-control">
          <div className="profile-image-wrap">
            <img src={`${API}${avatarFilename}`} alt="" />
          </div>
          <div
            className={`profile-link-item ${activeLink === 0 && "active-1"}`}
            onClick={() => setActiveLink(0)}
          >
            <div className="icon">
              <img src={activeLink === 0 ? activeSettings : settings} alt="" />
            </div>
            <div className={`profile-link-item-text`}>Аккаунт</div>
          </div>
          <div
            className={`profile-link-item ${activeLink === 1 && "active-1"}`}
            onClick={() => setActiveLink(1)}
          >
            <div className="icon">
              <img
                src={activeLink === 1 ? activeChangePassword : changePassword}
                alt=""
              />
            </div>
            <div className={`profile-link-item-text`}>Изменение пароля</div>
          </div>
          <div
            className={`profile-link-item ${activeLink === 2 && "active-1"}`}
            onClick={() => setActiveLink(2)}
          >
            <div className="icon">
              <img
                src={activeLink === 2 ? activeUserGroup : userGroup}
                alt=""
              />
            </div>
            <div className={`profile-link-item-text`}>Сотрудники</div>
          </div>
          <div
            className={`profile-link-item ${activeLink === 3 && "active-1"}`}
            onClick={() => setActiveLink(3)}
          >
            <div className="icon">
              <img src={activeLink === 3 ? activeAddPhoto : addPhoto} alt="" />
            </div>
            <div className={`profile-link-item-text`}>Фотографии</div>
          </div>
          <div className={`profile-link-item `} onClick={() => logout()}>
            <div className="icon">
              <img src={logoutIcon} alt="" />
            </div>
            <div className={`profile-link-item-text`}>Выход из системы</div>
          </div>
        </div>
        <div className="profile-data">
          {activeLink === 0 && <ProfileAccount />}
          {activeLink === 1 && <ChangePassword />}
          {activeLink === 2 && <ListEmployees />}
          {activeLink === 3 && <UploadProfileImages />}
        </div>
      </div>
    </>
  );
};

export default Profile;
