import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/admon");
  }, [isAuthenticated, isLoading, user]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (!(Array.from(searchParams).length > 0)) loginWithRedirect();
  }, [location]);

  if (!isAuthenticated && !user?.email) return <div>Cargando...</div>;
};

export default Login;
