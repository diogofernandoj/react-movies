import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoutes({ userData }) {
  return !userData ? <Navigate to="/login" /> : <Outlet />;
}
