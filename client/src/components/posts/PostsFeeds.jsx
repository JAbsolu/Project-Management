import * as React from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import illustration from "../../media/illustration.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PostsFeeds = ({ name, title, commentsLength, text, allComments }) => {
  const [tasks, setTasks] = useState();
  const [tasksErr, setTasksErr] = useState();
  const currentUser = useSelector((state) => state.user);
  const isMobile = useMediaQuery("(max-width: 600px)");

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
    <Box sx={{ maxWidth: "100rem"}}>
      <Box
        sx={{
          background: "#212e3f",
          maxWidth: isMobile ? "100%" : null,
          p: "1rem",
          m: "0.5rem 0",
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
            width="45px"
            height="45px"
            style={{ borderRadius: "50%" }}
          />
          <Box>
            <Typography fontWeight="bolder"> {name} </Typography>
            <Typography fontWeight="500" sx={{fontSize: isMobile ? '0.85rem' : "0.9rem",}}> {title} </Typography>
          </Box>
        </Box>
        <Box>
          <Typography sx={{fontSize: isMobile ? '0.85rem' : "0.9rem", lineHeight: 2, }}>{text}</Typography>
        </Box>
        {/* LIKES AND COMMENTS CONTAINER */}
        <Divider sx={{ mt: "1rem"}} />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "end",
            justifyContent: "end",
            margin: "0.2rem 0",
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              p: "0.5rem",
              borderRadius: "5px",
              "&:hover": {
                cursor: "pointer",
                background: "#6a798952",
              },
            }}
          >
            <Typography sx={{ fontSize: isMobile ? '0.75rem' : "0.85rem" }}> Likes</Typography>
            <FavoriteIcon sx={{ fontSize: isMobile ? '1rem' : '1rem', mt: '0.1rem'  }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              p: "0.5rem",
              borderRadius: "5px",
              "&:hover": {
                cursor: "pointer",
                background: "#6a798952",
              },
            }}
          >
            <Typography sx={{ fontSize: isMobile ? '0.75rem' : "0.85rem" }}>
              {commentsLength <= 0
                ? `${commentsLength} comment`
                : `${commentsLength} comments`}
            </Typography>
            <AddCommentIcon sx={{ fontSize: isMobile ? '1rem' : "1rem", mt: '0.2rem' }}/>
          </Box>

        </Box>

         {/* This will open when comments are clicked */}
         <Divider sx={{ color: "#fff"}}/>
         <Box sx={{ 
                p:'0.5rem', 
                display: "flex", 
                justifyContent: 'end', 
                alignItems: 'end', 
                flexDirection: "column", 
                gap: "0.5rem", 
                maxWidth: "100%" 
              }}>
              <Typography sx={{ fontSize: isMobile ? '0.75rem' : "0.85rem" }}>
                {allComments}
              </Typography>
          </Box>
      </Box>
    </Box>
  );
};

export default PostsFeeds;