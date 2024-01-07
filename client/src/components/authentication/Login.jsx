import * as React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  minHeight: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": { m: 1, ml: 1, width: "30ch" },
  flexDirection: "column",
  mb: "2rem",
  mt: "1rem",
};

const LoginForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallestScreen = useMediaQuery("(max-width: 300px)");

  // GET FORM DATA
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // HANDLE SIGN IN
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3100/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const loggedIn = await response.json();
        if (loggedIn) {
          dispatch(
            setLogin({
              user: loggedIn.user,
              token: loggedIn.token,
            })
          );
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Could not sign in", error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        size={isSmallestScreen ? "small" : "large"}
        sx={{
          mt: "1rem",
          mb: "0.5rem",
          p: isSmallestScreen ? "0.45rem" : "0.7rem",
          minWidth: isSmallestScreen ? "6.5rem" : "9rem",
        }}
        onClick={handleOpen}
      >
        Sign in
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* SIGN IN FORM */}
        <Box
          component="form"
          sx={style}
          autoComplete="on"
          onSubmit={handleSignIn}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="p"
            sx={{
              mb: "1rem",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            Sign in to your account
          </Typography>
          <TextField
            required
            id="outlined-required email"
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
          />
          <TextField
            id="outlined-password-input password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ minWidth: "17rem", p: ".9rem 0", mt: "0.4rem", ml: 1 }}
          >
            Sign in
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginForm;
