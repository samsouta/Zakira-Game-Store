import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Page } from "../pages/Product_Detail/Page";
import { Order } from "../pages/Order";
import { User } from "../pages/user/User";
import NotFount from "../pages/NotFount";
import ProtectedRoute from "./guard/ProtectedRoute";
import PublicRoute from "./guard/PublicRoute";
import UnauthenticatedGuard from "./guard/UnauthenticatedGuard";
import Banned from "../pages/banned/Banned";
import BannedOnlyRoute from "./guard/BannedOnlyRoute";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { TermsOfService } from "../pages/TermsOfService";
import { SecurityPolicy } from "../pages/SecurityPolicy";
import SearchPage from "../pages/SearchPage";

export const Router = () => {
  return (
    <Routes>
      {/* Layout for all pages */}
      <Route path="/" element={<Layout />}>

        {/* ✅ Redirect root to /home */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* ✅ User-only pages */}
        <Route
          path="home"
          element={
            <ProtectedRoute userOnly>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="detail/:name"
          element={
            <ProtectedRoute userOnly>
              <Page />
            </ProtectedRoute>
          }
        />
        <Route
          path="order"
          element={
            <ProtectedRoute userOnly requireOrder>
              <UnauthenticatedGuard>
                <Order />
              </UnauthenticatedGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path=":username"
          element={
            <ProtectedRoute userOnly matchUsername>
              <UnauthenticatedGuard>
                <User />
              </UnauthenticatedGuard>
            </ProtectedRoute>
          }
        />

        <Route path="/search" element={<SearchPage />} />

        {/* ✅ Auth pages (no auth required) */}
        <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />


      </Route>

      {/* ✅ 404 Page */}
      <Route path="/404" element={<NotFount />} />
      <Route path="*" element={<NotFount />} />

      {/* ✅ Banned page */}
      <Route path="/banned" element={<BannedOnlyRoute><Banned /></BannedOnlyRoute>} />

      {/* ✅ Privacy Policy page */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* ✅ Terms of Service page */}
      <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* ✅ Security Policy page */}
      <Route path="/security-policy" element={<SecurityPolicy />} />
    </Routes>
  );
};
