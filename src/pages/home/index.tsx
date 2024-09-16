import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../theme";
import { StyledContainer, StyledImage } from "./styles";

const urlImages = {
  desktop: {
    desktop1: "https://d47djmvgvaczr.cloudfront.net/images/desktop-5.jpg",
    desktop2: "https://d47djmvgvaczr.cloudfront.net/images/desktop-2.jpg",
    desktop3: "https://d47djmvgvaczr.cloudfront.net/images/desktop-1.jpg",
    desktop4: "https://d47djmvgvaczr.cloudfront.net/images/desktop-3.jpg",
    desktop5: "https://d47djmvgvaczr.cloudfront.net/images/desktop-4.jpg",
  },
  mobile: {
    mobile1: "https://d47djmvgvaczr.cloudfront.net/images/mobile-5.jpg",
    mobile2: "https://d47djmvgvaczr.cloudfront.net/images/mobile-2.jpg",
    mobile3: "https://d47djmvgvaczr.cloudfront.net/images/mobile-1.jpg",
    mobile4: "https://d47djmvgvaczr.cloudfront.net/images/mobile-3.jpg",
    mobile5: "https://d47djmvgvaczr.cloudfront.net/images/mobile-4.jpg",
  },
};

const HomeImage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <StyledContainer>
      <Link to="/about-event" key={1}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile1 : urlImages.desktop.desktop1}
          alt="Carrera fundayama"
        />
      </Link>
      <Link to="/register" key={2}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile2 : urlImages.desktop.desktop2}
          alt="Carrera fundayama"
        />
      </Link>
      <Link to="/route" key={3}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile3 : urlImages.desktop.desktop3}
          alt="Carrera fundayama"
        />
      </Link>
      <StyledImage
        isMobile={isMobile}
        src={isMobile ? urlImages.mobile.mobile4 : urlImages.desktop.desktop4}
        alt="Carrera fundayama"
      />
      <Link to="/about-fundayama" key={5}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile5 : urlImages.desktop.desktop5}
          alt="Carrera fundayama"
        />
      </Link>
    </StyledContainer>
  );
};

export default HomeImage;
