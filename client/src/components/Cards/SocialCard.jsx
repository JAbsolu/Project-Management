import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "@mui/material";

const SocialIconsCard = ({ icon, link }) => {
    return (
      <Link href={link} target="_blank">
        <Card
          sx={{
            boxShadow: "none",
            background: "inherit",
            fontSize: "1.4rem",
          }}
        >
          <CardContent>{icon}</CardContent>
        </Card>
      </Link>
    );
  };

  export default SocialIconsCard;