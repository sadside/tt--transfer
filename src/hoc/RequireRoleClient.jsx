import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { Role } from "../context";

const RequireRoleClient = ({ children }) => {
  const role = useSelector((state) => state.user.user.role);
  console.log("role:", role);

  if (role !== "c") {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default RequireRoleClient;
