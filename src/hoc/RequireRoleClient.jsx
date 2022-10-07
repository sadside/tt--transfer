import { useStore, useUnit } from "effector-react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { Role } from "../context";
import {
  $loadingUserData,
  $user,
  checkAuthFx,
} from "../effector/user/authorization";

const RequireRoleClient = ({ children }) => {
  const { role } = useUnit($user);

  if (role === "c") {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default RequireRoleClient;
