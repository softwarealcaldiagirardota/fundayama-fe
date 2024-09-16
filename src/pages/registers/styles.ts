import styled from "@emotion/styled";

const StyledContainerActions = styled("div")(
  ({ isMobile }: { isMobile?: boolean }) => ({
    display: "flex",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: isMobile ? "100%" : "100%",
  })
);

export { StyledContainerActions };
