import { useLocation, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const RequireAuth = () => {
  const location = useLocation();

  if (localStorage.getItem("token")) {
    return <Layout />;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default RequireAuth;
