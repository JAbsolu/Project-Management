import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import PostsFeeds from "../../components/posts/PostsFeeds";
import NewPost from "../../components/posts/newPost";
import RightPanel from "./right-panel";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Dashboard = () => {

  const currentUser = useSelector((state) => state.user);
  const [tasks, setTasks] = useState();
  const [tasksErr, setTasksErr] = useState();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");


  // GET ALL POSTS
  const getPosts = async () => {
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
    getPosts();
  }, []);


  // MENU DRAWER
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    dispatch(setLogout());
  };


  return (
    <Box sx={{ display: "flex", minHeight: "90vh", background: "#0f1925" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "#0f1925" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: isMobile ? "1rem" : null,
            }}
          >
            TASKFLOW
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Dashboard", "Tasks", "Invite"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <HomeOutlinedIcon sx={{ color: "#0f1925" }} />
                  ) : index === 1 ? (
                    <GridViewOutlinedIcon sx={{ color: "#0f1925" }} />
                  ) : index === 2 ? (
                    <AssignmentOutlinedIcon
                      sx={{
                        color: "#0f1925",
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : index === 3 ? (
                    <SendOutlinedIcon sx={{ color: "#0f1925" }} />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* LOGOUT ICON  */}
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon
                    onClick={handleLogout}
                    sx={{ color: "#0f1925" }}
                  />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: "0 0.25rem" }}>
        <DrawerHeader />
        <Box sx={{ color: "#fff", display: isMobile ? null : "flex", gap: isMobile ? 0 : "0.3rem" }}>

        {/* USER INFO SHOULD BE ADDED BELOW THIS COMMENT*/}
          


          {/* RIGHT PANEL SHOULD BE ADDED BELOW THIS COMMENT*/}
          <Box
            dth="auto"
            minHeight={!isMobile ? "100vh" : "auto"}
            sx={{
              // background: "#00000061",
              background: "#ffffff03",
              maxWidth: isMobile ? "100rem" : null,
              padding: isMobile ? null : "0.5rem 1rem",
              overflowY: "scroll",
              mt: "0.3rem",
              ml: "0.2rem",
              boxShadow: 1,
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="bold"
              fontSize={isMobile ? "1rem" : "1.2rem"}
              p="0.25rem 0"
              mb="0.5rem"
            >
              Posts Feed
            </Typography>
            <Box
              sx={{
                mb: "1.5rem",
                background: "#212e3f",
                p: "1rem",
                borderRadius: "5px",
                maxWidth: "100%",
              }}
            >
              <Typography fontWeight="bold" mb={isMobile ? "1rem" :"0.5rem"}>
                Add a post
              </Typography>

                {/* NEW POST COMPONENT */}
                <NewPost />

            </Box>

            {tasks
              ? tasks.map((poster) => (
                  <PostsFeeds
                    name={`${poster.firstName} ${poster.lastName}`}
                    title={poster.title}
                    commentsLength={poster.comments.length}
                    text={poster.text}
                    allComments={`Add comments`}
                  />
                ))
              : ""}
          </Box>

          {/* Right Panel */}
          {
            isMobile ? null : <RightPanel />
          }

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
