import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import illustration from "../../media/illustration.png";
import { useMediaQuery } from "@mui/material";
import { Tasks } from "../../components/Dashboard/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RightPanel = () => {

    const [tasks, setTasks] = useState();
    const [tasksErr, setTasksErr] = useState();
    const currentUser = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width: 600px)");
    

    return (
        // TASKS FEED
        <Box
          width="auto"
          minHeight={!isMobile ? "100vh" : "auto"}
          sx={{
            // background: "#00000061",
            background: "#ffffff03",
            padding: "0.5rem 1rem",
            overflowY: "scroll",
            mt: "0.3rem",
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: "15rem",
            }}
          >
            <Typography
              fontWeight="bold"
              fontSize="1rem"
              p="0.25rem 0"
              mb="0.5rem"
            >
              Tasks Overview
            </Typography>
            <Typography
              variant="a"
              fontSize="0.75rem"
              p="0.25rem 0"
              mt= "0.25rem"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              View all
            </Typography>
          </Box>
          <Box
            sx={{
              mb: "1.5rem",
              background: "#212e3f",
              p: "1rem",
              borderRadius: "5px",
              minHeight: "20rem",
            }}
          >
            <Typography fontWeight="bold" mb="0.5rem" sx={{ fontSize: '0.9rem'}}>
             Team tasks
            </Typography>
          </Box>
          {tasks
            ? tasks.map((poster) => (
                <Box
                  sx={{
                    background: "#212e3f",
                    p: "1rem",
                    m: "1rem 0",
                    borderRadius: "5px",
                  }}
                >
                  <Box
                    mb="1rem"
                    sx={{
                      display: "flex",
                      gap: "1.2rem",
                      alignItems: "end",
                    }}
                  >
                    <img
                      src={illustration}
                      alt="user"
                      width="70px"
                      style={{ borderRadius: "5px" }}
                    />
                    <Box>
                      <Typography fontWeight="bolder">
                        {`${poster.firstName} ${poster.lastName}`}{" "}
                      </Typography>
                      <Typography fontWeight="bolder">
                        {" "}
                        {poster.title}{" "}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography>{poster.text}</Typography>
                  </Box>
                </Box>
              ))
            : " "}
        </Box>
    )
}

export default RightPanel;