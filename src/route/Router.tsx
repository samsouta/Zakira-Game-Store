import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Page } from "../pages/Product_Detail/Page";
import PublicRoute from "./guard/PublicRoute";
import { Order } from "../pages/Order";
import OrderGuard from "./guard/OrderGuard";
import { User } from "../pages/user/User";
import UserGuard from "./guard/UserGuard";
import NotFount from "../pages/NotFount";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:name" element={<Page />} />
          <Route path="/:username" element={<UserGuard><User /></UserGuard>} />
          <Route path="/order" element={
            <OrderGuard>
              <Order />
            </OrderGuard>
          } />

          {/* /**
        * Auth Route
        */ }
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Route>

        {/* //404  */}
        <Route path="/404" element={<NotFount />} />

      </Routes>
    </>
  );
};
