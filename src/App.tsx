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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeImage />} />
          <Route path="/register" element={<Registers />} />
          <Route path="/about-fundayama" element={<AboutFundayama />} />
          <Route path="/about-event" element={<AboutEvent />} />
          RouteComponent
          <Route path="/route" element={<RouteComponent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
