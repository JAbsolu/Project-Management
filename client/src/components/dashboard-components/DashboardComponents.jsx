import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTasks } from "../../state";
import { setPosts } from "../../state";
import UserWidget from '../widgets/userWidget'

export const UserInfo = () => {
  const isWideScreen = useMediaQuery("(min-width: 1800px)");
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3100/user/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);
    console.log(data);
  };

  
  useEffect(() => {
    getUser();
  }, []);



  if (!currentUser) return null;
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2rem",
          mb: "2rem",
          mt: "-3.4rem",
          background: "#fff",
          p: "2rem 0.5rem",
          borderRadius: "0.75rem",
          textAlign: "center",
          boxShadow: 1,
        }}
      >
        Welcome to your dasboard
      </Typography>
      <UserWidget />
    </>
  );
};


// TASKS

export const Tasks = () => {
  const isWideScreen = useMediaQuery("(min-width: 1800px)");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.tasks);
  const posts = useSelector((state) => state.posts);
  const userTasks = useSelector((state) => state.user.tasks);
  const { userId } = useParams();


  // GET POSTS

  const getTasks = async () => {
    try {
      const tasksResponse = await fetch(`http://localhost:3100/tasks`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const tasksData = await tasksResponse.json();
      dispatch(setTasks({ tasks: tasksData }));
      console.log(tasksData);
    } catch (error) {
      console.error(`There was an error fetching tasks: ${error}`);
    }
  };

  //  GET POSTS
  const getPosts = async () => {
    try {
      const postsResponse = await fetch(`http://localhost:3100/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const postsData = await postsResponse.json();
      console.log("Posts data:", postsData);
      dispatch(setPosts({ posts: postsData }));
    } catch (error) {
      setPosts([]);
      console.error(`There was an error fetching posts: ${error}`);
    }
  };

  useEffect(() => {
    getTasks();
    getPosts();
  }, []); // Empty dependency array ensures these run only once



  // COMPONENT
  return (
    <Box
      sx={{
        background: "#fff",
        padding: "1rem",
        width: "23rem",
        minHeight: isWideScreen ? "42rem" : "28rem",
        boxShadow: 2,
        borderRadius: "0.75rem",
      }}
    >
      <Box>
        <Typography>Your personal tasks</Typography>
        <Box>
          {tasks.map((task) => (
            <div key={task._id}>
              {task.userId}
              {task.firstName}
              {task.lastName}
              {task.title}
            </div>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography>Posts</Typography>
        {posts.map((post) => (
          <div key={post._id}>
            <Typography>{post.userId}</Typography>
            <Typography>{post.firstName}</Typography>
            <Typography>{post.lastName}</Typography>
            <Typography>{post.title}</Typography>
          </div>
        ))}
      </Box>
    </Box>
  );
};
