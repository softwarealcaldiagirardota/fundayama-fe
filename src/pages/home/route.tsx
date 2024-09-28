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
  rutaDesktop: {
    dos: "https://d47djmvgvaczr.cloudfront.net/images/details/rutadesktop2kNew.jpg",
    cinco:
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutadesktop5kNew.jpg",
    diez: "https://d47djmvgvaczr.cloudfront.net/images/details/rutadesktop10kNew.jpg",
  },
  rutaMobile: {
    dos: "https://d47djmvgvaczr.cloudfront.net/images/details/rutamobile2kNew.jpg",
    cinco:
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutamobile5kNew.jpg",
    diez: "https://d47djmvgvaczr.cloudfront.net/images/details/rutamobile10kNew.jpg",
  },
};

const RouteComponent = () => {
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
          style={{ marginTop: "50px" }}
          isMobile={isMobile}
          src={isMobile ? urlImages.rutaMobile.dos : urlImages.rutaDesktop.dos}
          alt="Carrera fundayama"
        />
        <StyledImage
          isMobile={isMobile}
          src={
            isMobile ? urlImages.rutaMobile.cinco : urlImages.rutaDesktop.cinco
          }
          alt="Carrera fundayama"
        />
        <StyledImage
          isMobile={isMobile}
          src={
            isMobile ? urlImages.rutaMobile.diez : urlImages.rutaDesktop.diez
          }
          alt="Carrera fundayama"
        />
      </StyledContainer>
    </Box>
  );
};

export default RouteComponent;
