// src/components/AdminRoute.jsx
import { Navigate, useOutletContext } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const context = useOutletContext();
  if (!context) return null;
  const { user, authLoading } = context;

  if (authLoading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export const UserProfileRoute = ({ children }) => {
  
  const context = useOutletContext();
  if (!context) return null;

  const { user, authLoading } = context;

  if (authLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

