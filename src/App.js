import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Moderation from "./components/moderation/Moderation";
import { checkAuthFx, userNotAuthorized } from "./effector/user/authorization";
import RequireAuth from "./hoc/RequireAuth";
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
import Success from "./pages/success/Success";
import Tariffs from "./pages/tariffs/Tariffs";

function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuthFx();
    } else {
      userNotAuthorized();
    }
  }, []);

  console.log("render");

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
