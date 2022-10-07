import { useStore, useUnit } from "effector-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import {
  $loadingUserData,
  $user,
  checkAuthFx,
} from "../effector/user/authorization";

const RequireRoleManager = ({ children }) => {
  const { role } = useUnit($user);

  if (role === "m") {
    return children;
  } else {
    alert("loading role");
    return <Navigate to={"/"} />;
  }
};

export default RequireRoleManager;
