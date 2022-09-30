import { useStore, useUnit } from "effector-react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { $user, checkAuthFx } from "../effector/user/authorization";

const RequireRoleManager = ({ children }) => {
  const { role } = useUnit($user);

  if (role !== "m" && role !== "") {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default RequireRoleManager;
