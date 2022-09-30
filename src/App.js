import { YMaps } from "@pbe/react-yandex-maps";
import { useGate, useStore } from "effector-react";
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Moderation from "./components/moderation/Moderation";
import { Role } from "./context";
import {
  $authFailed,
  $isAuth,
  appMounted,
  checkAuthFx,
} from "./effector/user/authorization";
import RequireNotAuth from "./hoc/RequireNotAuth";
import RequireRoleClient from "./hoc/RequireRoleClient";
import RequireRoleManager from "./hoc/RequireRoleManager";
import Activity from "./pages/activity/Activity";
import Cars from "./pages/cars/Cars";
import Clients from "./pages/clients/Clients";
import Drivers from "./pages/drivers/Drivers";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import Orders from "./pages/orders/Orders";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import PasswordSent from "./pages/passwordSent/PasswordSent";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Request from "./pages/requests/Request";
import Layout from "./components/layout/Layout";
import Success from "./pages/success/Success";
import Tariffs from "./pages/tariffs/Tariffs";
import RequireAuth from "./hoc/RequireAuth";
import { useEffect } from "react";
import { store } from "./store";
import { checkAuth, setIsAuth } from "./store/userSlice.ts";

function App() {
  const isAuth = useStore($isAuth);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, [isAuth]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuthFx();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth></RequireAuth>}>
          <Route index element={<Activity />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="requests"
            element={
              <RequireRoleManager>
                <Request />
              </RequireRoleManager>
            }
          />
          <Route
            path="drivers"
            element={
              <RequireRoleManager>
                <Drivers />
              </RequireRoleManager>
            }
          />
          <Route
            path="cars"
            element={
              <RequireRoleManager>
                <Cars />
              </RequireRoleManager>
            }
          />
          <Route
            path="tariffs"
            element={
              <RequireRoleManager>
                <Tariffs />
              </RequireRoleManager>
            }
          />
          <Route
            path="clients"
            element={
              <RequireRoleManager>
                <Clients />
              </RequireRoleManager>
            }
          />
          <Route
            path="orders"
            element={
              <RequireRoleClient>
                <Orders />
              </RequireRoleClient>
            }
          />
          <Route
            path="order"
            element={
              <RequireRoleClient>
                <Order />
              </RequireRoleClient>
            }
          />
        </Route>
        <Route
          path="/password-sent"
          element={
            <RequireNotAuth>
              <PasswordSent />
            </RequireNotAuth>
          }
        />
        <Route
          path="/reset-password"
          element={
            <RequireNotAuth>
              <PasswordReset />
            </RequireNotAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireNotAuth>
              <Register />
            </RequireNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <Login />
            </RequireNotAuth>
          }
        />
        <Route path="/test" element={<Moderation />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
