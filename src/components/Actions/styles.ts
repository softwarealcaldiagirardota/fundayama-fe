import styled from "@emotion/styled";
import { palette } from "../../theme";

const StyledActions = styled("div")((isMobile: { isMobile?: boolean }) => ({
  position: "relative" as const,
  display: "flex",
  flexDirection: "row" as const,
  border: `1px solid ${palette.primary.borderColor}`,
  height: "100px",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  marginRight: isMobile.isMobile ? "0" : "20px",
  marginBottom: "20px",
  borderRadius: "8px",
  backgroundColor: palette.neutral.W,
  cursor: "pointer",
}));

const StyledBorder = styled("div")(() => ({
  position: "absolute" as const,
  left: "0",
  top: "0",
  bottom: "0",
  backgroundColor: palette.primary.main,
  width: "8px",
  borderRadius: "8px 0 0 8px",
}));

const StyledLogo = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 10px;
`;

export { StyledActions, StyledLogo, StyledBorder };
