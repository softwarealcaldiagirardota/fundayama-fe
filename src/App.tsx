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
import Login from "./pages/login";
import Liquidation from "./pages/liquidation";
import { CommonProvider } from "./components/context/common-context";

function App() {
  return (
    <CommonProvider>
    <ThemeProvider theme={theme}>
      
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeImage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registers />} />
            <Route path="/about-fundayama" element={<AboutFundayama />} />
            <Route path="/about-event" element={<AboutEvent />} />
            RouteComponent
            <Route path="/route" element={<RouteComponent />} />
            <Route
                path="/dashboard"
                element={
                  
                    <Liquidation />
                
                }
              />
          </Routes>
        </BrowserRouter>
      
    </ThemeProvider>
    </CommonProvider>
  );
}

export default App;
