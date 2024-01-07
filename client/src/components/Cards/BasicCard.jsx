import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";

const BasicCard = ({ title, description, image }) => {
  const isMobile = useMediaQuery("(max-width: 550px)");
  const isWideScreen = useMediaQuery("(min-width: 1790px)");
  return (
    <Card
      sx={{
        maxWidth: isWideScreen ? "550px" : isMobile ? "100%" : "425px",
        margin: "0.5rem 0",
        minHeight: "200px",
        padding: "0.5rem 1rem 0",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body1"
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "1rem 0",
          }}
        >
          {description}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="illustration"
        />
      </CardContent>
    </Card>
  );
};

export default BasicCard;