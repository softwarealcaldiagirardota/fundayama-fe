import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      let token = await getAccessTokenSilently();
      if (!token) {
        token = localStorage.getItem("token") || "";
      }
      if (token === undefined) navigate("/login");
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("***error", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [isAuthenticated, isLoading, user]);

  return isAuthenticated && !isLoading ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
