import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const StyledContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column" as const,
  alignItems: " flex-start",
  justifyContent: " flex-start",
  width: "100%",
  position: "absolute" as const,
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: 10,
}));
export const StyledImage = styled("img")(
  ({ isMobile, isList }: { isMobile?: boolean; isList?: boolean }) => ({
    width: "100vw",
    display: "block",
    margin: "auto auto",
    ...(!isMobile && !isList && { height: "100vh" }),
  })
);

export const StyledGoBack = styled(Typography)(() => ({
  fontWeight: "700",
  fontSize: "32px",
  lineHeight: "8px",
  letterSpacing: "0",
  color: "#111",
  position: "absolute" as const,
  left: "30px",
  top: "30px",
  zIndex: 11,
  cursor: "pointer",
}));
