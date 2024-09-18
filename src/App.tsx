import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeImage from "./pages/home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Registers from "./pages/registers";
import AboutFundayama from "./pages/home/about-fundayama";
import ScrollToTop from "./components/scroll-to-top";
import AboutEvent from "./pages/home/about-event";
import RouteComponent from "./pages/home/route";
import InscriptionTable from "./pages/admon";
import { Auth0Provider } from "@auth0/auth0-react";
import PrivateRoute from "./pages/private-routes";
import Login from "./pages/login";

export const domain = "dev-t7qrzenx1neaggbp.us.auth0.com"; //import.meta.env.VITE_AUTH0_DOMAIN;
export const clientId = "0ma0D9e7Qb2aff6N4vWoMHL2X81j4FTC"; //import.meta.env.VITE_AUTH0_CLIENT_ID;
export const audience = "https://api.girardotabackoffice.com";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/login`,
          audience: audience,
        }}
      >
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeImage />} />
            <Route path="/register" element={<Registers />} />
            <Route path="/about-fundayama" element={<AboutFundayama />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-event" element={<AboutEvent />} />
            RouteComponent
            <Route path="/route" element={<RouteComponent />} />
            <Route
              path="/admon"
              element={
                <PrivateRoute>
                  <InscriptionTable />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;
