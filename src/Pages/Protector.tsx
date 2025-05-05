import { useAuth } from "@/Hooks";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protector = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();

   useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
        setIsAuthenticated(true);
    }
   }, [setIsAuthenticated]);

    
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default Protector