import * as React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": { m: 1, ml: 1, width: "30ch" },
  flexDirection: "column",
  background: "#fff",
  mb: "2rem",
  mt: "1rem",
};

const RegisterForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isSmallestScreen = useMediaQuery("(max-width: 300px)");
  const [isSubmit, setIsSubmit] = useState(false);

  // GET FORM DATA
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    location: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // HANDLE REGISTRATION
  const handleRegistration = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:3100/register", {
        method: "POST",
        body: JSON.stringify(formData), // Convert formData to JSON
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const savedUser = await response.json();
        setIsSubmit(true);
      } else {
        // Handle error
        console.error("There was no response");
      }
    } catch (error) {
      console.error(`Registration failed, error: ${error}`);
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
        Register
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
          onSubmit={handleRegistration}
          style={{
            display: "flex",
            flexDirection: "column",
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
            Register for an account
          </Typography>

          <TextField
            required
            id="outlined-required"
            name="firstName"
            label="First name"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />
          <TextField
            required
            id="outlined-required"
            name="lastName"
            label="Last name"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-required"
            label="Title"
            name="title"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-required"
            label="Location"
            name="location"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-required"
            name="userName"
            label="Username"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-required"
            name="email"
            label="Email"
            type="email"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <TextField
            required
            id="outlined-password-input"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={isSubmit ? "" : null}
          />

          <Button
            variant="contained"
            name="submit"
            type="submit"
            size="large"
            sx={{ minWidth: "17rem", p: ".9rem 0", mt: "0.4rem", ml: 1 }}
          >
            Register
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterForm;
