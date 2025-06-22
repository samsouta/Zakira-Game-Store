import {  Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";

export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};
