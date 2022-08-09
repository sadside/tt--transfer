import { useLocation, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const RequireNotAuth = ({ children }) => {
  const location = useLocation();

  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default RequireNotAuth;
