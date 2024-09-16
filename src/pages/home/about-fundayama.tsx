import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../theme";
import { StyledContainer, StyledImage } from "./styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const urlImages = {
  desktop: {
    desktop1:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutdesktop1.jpg",
    desktop2:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutdesktop2.jpg",
    desktop3:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutdesktop3.jpg",
    desktop4:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutdesktop4.jpg",
  },
  mobile: {
    mobile1:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutmobile1.jpg",
    mobile2:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutmobile2.jpg",
    mobile3:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutmobile3.jpg",
    mobile4:
      "https://d47djmvgvaczr.cloudfront.net/images/details/aboutmobile4.jpg",
  },
};

const AboutFundayama = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "70px",
      }}
    >
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="go back"
            onClick={() => navigate(-1)} // Navegar hacia atrás
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Camina, Corre & Tócate
          </Typography>
        </Toolbar>
      </AppBar>

      <StyledContainer>
        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile1 : urlImages.desktop.desktop1}
          alt="Carrera fundayama"
        />

        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile2 : urlImages.desktop.desktop2}
          alt="Carrera fundayama"
        />

        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile3 : urlImages.desktop.desktop3}
          alt="Carrera fundayama"
        />

        <StyledImage
          isMobile={isMobile}
          src={isMobile ? urlImages.mobile.mobile4 : urlImages.desktop.desktop4}
          alt="Carrera fundayama"
        />
      </StyledContainer>
    </Box>
  );
};

export default AboutFundayama;
