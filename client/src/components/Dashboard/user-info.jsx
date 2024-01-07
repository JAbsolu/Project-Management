
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import illustration from "../../media/illustration.png";
import { Tasks } from "../../components/Dashboard/DashboardComponents";
import TeammatesCards from "../Cards/TeammatesCard";

const DashboardUserinfo = () => {
  const userFullName = `${currentUser.firstName} ${currentUser.lastName}`;
  const isMobile = useMediaQuery("(max-width: 600px)");

    return (
        <Box
            sx={{
              padding: "0.25rem",
              display: "flex",
              position: "fixed",
              flexDirection: "column",
              gap: "0.50rem",
            }}
          >
            <Box
              width="19.5rem"
              height="22rem"
              sx={{
                // background: "#00000061",
                background: "#ffffff03",
                padding: "1rem 0.5rem",
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                margin: "0rem",
                boxShadow: 1,
              }}
            >
              <Typography fontWeight="bold" fontSize="1.2rem" p="0.25rem 0">
                Welcome {userFullName}
              </Typography>
              <img
                src={illustration}
                width="100"
                style={{ borderRadius: "5px" }}
              />
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <PersonOutlineOutlinedIcon />
                <Typography fontWeight="300">{userFullName}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <WorkOutlineIcon />
                <Typography fontWeight="500">{currentUser.title}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <LocationOnOutlinedIcon />
                <Typography fontWeight="500">{currentUser.location}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <AssignmentOutlinedIcon />
                <Typography fontWeight="500"> Tasks: {Tasks.length}</Typography>
              </Box>
            </Box>

            {/* USER TEAMMATES */}
            <Box
              width="19.5rem"
              height={"35.1rem"}
              sx={{
                // background: "#00000061",
                background: "#ffffff03",
                padding: "1rem 0.5rem",
                overflowY: "scroll",
                margin: "0rem",
                boxShadow: 1,
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize="1.2rem"
                p="0.25rem 0"
                mb="0.5rem"
              >
                My Teammates
              </Typography>
              <Box
                width="18rem"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                }}
              >
                <TeammatesCards
                  link="none"
                  name={userFullName}
                  image={illustration}
                  title={currentUser.title}
                />
              </Box>
            </Box>
          </Box>
    )
}

export default DashboardUserinfo;