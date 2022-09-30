import { useStore, useUnit } from "effector-react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { Role } from "../context";
import { $user } from "../effector/user/authorization";

const RequireRoleClient = ({ children }) => {
  const { role } = useUnit($user);

  if (role !== "c" && role !== "") {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default RequireRoleClient;
