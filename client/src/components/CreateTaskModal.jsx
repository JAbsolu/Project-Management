import * as React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const style = {
  position: 'absolute',
  display: "flex",
  gap: '0.5rem',
  flexDirection: "column",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "5px",
  boxShadow: 2,
  p: 4,
};

const CreateTaskModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.user);

  // GET FORM DATA
  const [inputValues, setInputValues] = useState({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    title: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3100/tasks/${user._id}`, {
        method: "POST",
        body: JSON.stringify(inputValues),
        headers: { "Content-Type": "application/json" }, // Correct header key
      });
  
      if (response.ok) {
        const savedPost = await response.json();
        // Clear the input fields after successful post creation
        setInputValues({
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          title: "",
          description: "",
        });
        handleClose(); // Close the modal
      } else {
        console.log("There was no response from the call");
      }
    } catch (error) {
      console.error(`Error creating new post: ${error}`);
    }
  };

  return (
    <div>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
        {/* USER PROFILE PICTURE  */}
        <Box sx={{ display: "flex", width: "100%", justifyContent: "end"}}>
            <Typography
              onClick={handleOpen}
                sx={{
                    p: "0.5rem",
                    "&:hover": {
                        background: "#6a798952",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }
                }}
            >
                Create new task
            </Typography>
        </Box>
        </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={createTasks}>
            <Typography variant="h5" mb="1rem" textAlign="center" >Create new task</Typography>
            <TextField 
                name="userId" 
                value={user._id} 
                onChange={handleInputChange} 
                id="outlined-basic" 
                label="userId" 
                variant="outlined" 
                style={{ display: "none" }} 
            />
            <TextField 
                name="firstName" 
                value={inputValues.firstName} 
                onChange={handleInputChange} 
                id="filled-basic" 
                label="First name" 
                variant="outlined" 
                style={{ display: "none" }} 
            />
            <TextField 
                name="lastName" 
                value={inputValues.lastName} 
                onChange={handleInputChange} 
                id="filled-basic" 
                label="Last name" 
                variant="outlined" 
                style={{ display: "none" }} 
            />
            <TextField 
                name="title" 
                value={inputValues.title} 
                onChange={handleInputChange} 
                id="filled-basic" 
                label="Title" 
                variant="outlined" 
            />
            <TextareaAutosize 
                name="text" 
                // value={inputValues.description} 
                onChange={handleInputChange} 
                minRows={4} 
                placeholder="Write task description" 
                style={{ 
                    height: "15rem", 
                    width: "99%", 
                    background: "#6a798952", 
                    fontSize: "1rem",
                }}
            />
            <Button 
                type="submit" 
                variant="contained" 
                style={{ background: "#212e3f"}}
            >
                Create task
            </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateTaskModal;