import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireRoleManager = ({ children }) => {
  const role = useSelector((state) => state.user.user.role);

  if (role !== "m") {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default RequireRoleManager;
