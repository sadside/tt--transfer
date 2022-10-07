import { useUnit } from "effector-react";
import { useLocation, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Loader from "../components/loader/Loader";
import { $isAuth, $loadingUserData } from "../effector/user/authorization";

const RequireNotAuth = ({ children }) => {
  const location = useLocation();

  const isAuth = useUnit($isAuth);

  const loading = useUnit($loadingUserData);

  if (loading) {
    return (
      <div style={{ height: "100vh" }}>
        <Loader />;
      </div>
    );
  }

  if (!isAuth) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default RequireNotAuth;
