import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage/index";
import Nav from './views/nav/index';
import Footer from './views/footer/index';
import Dashboard from "./views/dashboardPage/index";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.user)); //using state.user insteadof state.token for now to authorize login

  return (
    <div className="app">
      { !isAuth ? <Nav/> : "" }
      <BrowserRouter>
        {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <Routes>
            <Route path={"/"} element= {isAuth ? <Dashboard /> : <HomePage />} />
            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        {/* </ThemeProvider> */}
      </BrowserRouter>
      { !isAuth ? <Footer/> : " " }
    </div>
  );
}

export default App;