import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const FlexCenter = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "3rem",
  alignItems: "center",
  flexBasis: "auto",
});

export default FlexCenter;
