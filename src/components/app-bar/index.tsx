import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";

// Estilo para el Drawer con fondo gris
const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#f5f5f5", // Gris claro estilizado
    width: 180, // Ancho del drawer
    boxSizing: "border-box",
  },
}));

function AppBarComponent({ children }) {
  const { logout } = useAuth0(); // Auth0 logout
  const navigate = useNavigate(); // React Router navigate

  // Menu items for navigation
  const menuItems = [
    { text: "Dashboard", path: "/dashboard" },
    { text: "Vehículos", path: "/vehiculos" },
    { text: "Autorizaciones", path: "/autorizaciones" },
    { text: "Certificados", path: "/certificados" },
    { text: "Informes", path: "/informes" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           Fundayama
          </Typography>

          {/* Logout Button */}
          <Button color="inherit" onClick={() => logout()}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer Permanente */}
      <StyledDrawer variant="permanent" anchor="left">
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      <Box component="main" sx={{ pt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}

export default AppBarComponent;
