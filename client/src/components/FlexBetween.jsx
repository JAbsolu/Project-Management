import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  gap: "3rem",
  flexBasis: "auto",
});

export default FlexBetween;
