import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  tasks: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user; // Corrected line
      state.token = action.payload.token; // Corrected line
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setUserTeammates: (state, action) => {
      if (state.user) {
        state.user.teammates = action.payload.teammates;
      } else {
        console.error("User has no teammates");
      }
    },
    setUserTasks: (state, action) => {
      if (state.user) {
        state.user.assignedTasks = action.payload.assignedTasks;
      } else {
        console.error("User has no tasks.");
      }
    },
    setUserPosts: (state, action) => {
      if (state.user) {
        state.user.post = action.payload.post;
      } else {
        console.error("User has no post.");
      }
    },
    setUserTeam: (state, action) => {
      if (state.user) {
        state.user.team = action.payload.team;
      } else {
        console.error("User has no team.");
      }
    },
    setTasks: (state, action) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action.payload.task._id) {
          return action.payload.task;
        }
        return task;
      });
      state.tasks = updatedTasks;
    },
    setPosts: (state, action) => {
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.post = updatePosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setUserTeammates,
  setUserTasks,
  setUserTeam,
  setTasks,
  setPosts,
} = authSlice.actions;

export default authSlice.reducer;
