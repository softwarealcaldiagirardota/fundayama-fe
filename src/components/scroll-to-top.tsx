import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Mueve el scroll al inicio
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null; // No renderiza nada en la UI
};

export default ScrollToTop;
