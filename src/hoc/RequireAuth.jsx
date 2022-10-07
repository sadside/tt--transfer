import { useUnit } from "effector-react";
import { useLocation, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Loader from "../components/loader/Loader";
import { $isAuth, $loadingUserData } from "../effector/user/authorization";

const RequireAuth = () => {
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

  if (isAuth && !loading) {
    return <Layout />;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default RequireAuth;
