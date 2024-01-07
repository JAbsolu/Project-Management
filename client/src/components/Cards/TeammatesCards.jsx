import * as React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../FlexBetween";

const TeammatesCards = ({ profilePic, fullName, userTitle  }) => {
    const [tasks, setTasks] = useState();
    const [tasksErr, setTasksErr] = useState();
    const currentUser = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width: 600px)");
    const userFullName = `${currentUser.firstName} ${currentUser.lastName}`;
  
    const getTasks = async () => {
        try {
          const response = await fetch("http://localhost:3100/posts", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error(` There are no tasks: ${error}`);
          setTasksErr(error);
        }
      };
    
      useEffect(() => {
        getTasks();
      }, []);
  
  
  return (
    <Box
          sx={{
            // background: "#00000061",
            background: "#212e3f",
            borderRadius: "5px",
            padding: " 0.5rem 1rem",
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.75rem",
            margin: "0rem",
          }}
        >
          {/* USER PROFILE */}
          {
            profilePic = currentUser.picturePath ? ( 
              <img
                src={currentUser.picturePath}
                width="50"
                style={{ borderRadius: "5px" }}
              />
            ) : (
              <FlexBetween> 
                <AccountBoxIcon 
                  sx={{ 
                    fontSize: 60, 
                    color: "#6a798952",
                    mt: "0.3rem",
                    mb: "0.5rem",
                  }}
                /> 
                {/* <EditIcon/> */}
              </FlexBetween>
            )
          }
          {/* <UserImage image={ currentUser.picturePath } /> */}
          <Box sx={{ display: "flex-column", alignItems: "end", gap: "0.3rem" }}>
            <Typography fontWeight="900" fontSize="0.85rem">
              { fullName = userFullName }
            </Typography>
            <Typography fontWeight="500" fontSize="0.8rem">
              { userTitle = currentUser.title }
            </Typography>
          </Box>
        </Box>
    )
  };
  
export default TeammatesCards;