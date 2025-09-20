import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token)
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}

const ProtectedRoute = () => {
  const token = localStorage.getItem("token")

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
