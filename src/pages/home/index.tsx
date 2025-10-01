import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../theme";
import { StyledContainer, StyledImage } from "./styles";

const urlImages = {
  desktop: {
    desktop1: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera-01.png",
    desktop2: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera-02.png",
    desktop3: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera-06.png",
    desktop4: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera-08.png",
    desktop5: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera-09.png",
  },
  mobile: {
    mobile1: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera_Mobile-01.png",
    mobile2: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera_Mobile-02.png",
    mobile3: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera_Mobile-06.png",
    mobile4: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera_Mobile-08.png",
    mobile5: "https://d47djmvgvaczr.cloudfront.net/images/WEB_Carrera_Mobile-09.png",
  },
};

const HomeImage = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <StyledContainer>
      <Link to="/register" key={1}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile1 : urlImages.desktop.desktop1}
          alt="Carrera fundayama"
        />
      </Link>
      <Link to="/route" key={2}>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile2 : urlImages.desktop.desktop2}
          alt="Carrera fundayama"
        />
      </Link>
      
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile3 : urlImages.desktop.desktop3}
          alt="Carrera fundayama"
        />
       <Link to="/register">
      <StyledImage
        isMobile={isMobile}
        src={isMobile ? urlImages.mobile.mobile4 : urlImages.desktop.desktop4}
        alt="Carrera fundayama"
      />
      </Link>
  
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile5 : urlImages.desktop.desktop5}
          alt="Carrera fundayama"
        />
    
    </StyledContainer>
  );
};

export default HomeImage;
