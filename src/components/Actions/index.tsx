import { Typography } from "@mui/material";
import { palette } from "../../theme";
import { StyledActions, StyledBorder, StyledLogo } from "./styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface IActions extends React.HTMLAttributes<HTMLDivElement> {
  logo: string;
  text: string;
}
const Actions = ({ logo, text, ...rest }: IActions) => {
  return (
    <StyledActions {...rest}>
      <StyledBorder />
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {text}
      </Typography>
      <StyledLogo src={logo} alt="Logo" />
      <ChevronRightIcon
        sx={{
          fontSize: "2rem",
          color: palette.primary.title,
        }}
      />
    </StyledActions>
  );
};

export default Actions;
