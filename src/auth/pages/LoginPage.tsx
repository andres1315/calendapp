import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore"

export const LoginPage = () => {
  const {token} = useAuthStore();
  if(token) return <Navigate to="/" />
  return (
    <h1>LoginPage</h1>
  )
}
