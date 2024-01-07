import { Box, Typography } from "@mui/material";
import { socialIcons } from "../../objects";
import { useSelector } from "react-redux";
import SocialIconsCard from "../../components/Cards/SocialCard";

const Footer = () => {
  const isAuth = Boolean(useSelector((state) => state.user)); //using state.user insteadof state.token for now to authorize login

  return (
    <Box
      sx={{
        display: isAuth ? "none" : "",
        background: "#1976d2",
        color: "#fff",
        minHeight: "50px",
        padding: "1rem 0 0 2.5rem",
        marginTop: isAuth ? "0" : "2rem",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          Taskflow
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mt: "0.5rem",
          }}
        >
          {Object.keys(socialIcons).map((iconKey) => {
            const icon = socialIcons[iconKey];
            return <SocialIconsCard icon={icon.icon} link={icon.link} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
