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
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutadesktop.jpg",
  },
  mobile: {
    mobile1:
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutamobile.jpg",
  },
  desktop10k: {
    desktop1:
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutaDesktop10k.jpg",
  },
  mobile10k: {
    mobile1:
      "https://d47djmvgvaczr.cloudfront.net/images/details/rutaMobile10k.jpg",
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
          src={isMobile ? urlImages.mobile.mobile1 : urlImages.desktop.desktop1}
          alt="Carrera fundayama"
        />
        <StyledImage
          isMobile={isMobile}
          src={
            isMobile
              ? urlImages.mobile10k.mobile1
              : urlImages.desktop10k.desktop1
          }
          alt="Carrera fundayama"
        />
      </StyledContainer>
    </Box>
  );
};

export default RouteComponent;
