// src/ProtectedRoute.jsx — proposed new file, does not exist in your repo
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
export default ProtectedRoute;