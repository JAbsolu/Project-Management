import * as React from 'react';
import { Typography, Box, Button, useMediaQuery } from '@mui/material';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import illustration from '../../media/illustration.png';


const style = {
  position: 'absolute',
  display: "flex",
  gap: '0.5rem',
  flexDirection: "column",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  bgcolor: 'background.paper',
  borderRadius: "5px",
  boxShadow: 2,
  p: 4,
};

const NewPost = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector((state) => state.user);
  const { userId } = useParams();
  const isMobile = useMediaQuery("(max-width: 600px)");

  // GET FORM DATA
  const [inputValues, setInputValues] = useState({
    userId:userId,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    title: currentUser.title,
    text: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createPost = async () => {
    try {
      const response = await fetch(`http://localhost:3100/posts/${currentUser._id}`, {
        method: "POST",
        body: JSON.stringify(inputValues),
        headers: { "Content-Type": "application/json" }, // Correct header key
      });
  
      if (response.ok) {
        // Assuming the API response contains the saved post data
        const savedPost = await response.json();
        // Clear the input fields after successful post creation
        setInputValues({
          userId: currentUser._id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          title: currentUser.title,
          text: "",
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
        <img
          src={illustration}
          alt="user"
          width={isMobile ? "40px" : "45px"}
          height={isMobile ? "40px" : "45px"}
          style={{ borderRadius: "50%" }}
        />
        <input
            type="text"
            onClick={handleOpen}
            style={{
              width: "95%",
              height: "2.5rem",
              background: "rgb(58 69 85)",
              border: "solid #fff 1px",
              padding: "0.5rem 0.2rem",
              color: "#fff",
              borderRadius: "0.2rem",
            }}
        />
        </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={createPost}>
            {/* <Typography variant="h6" mb="1rem" textAlign="center" >Create new post</Typography> */}
            <TextField 
                name="userId" 
                value={currentUser._id} 
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
                style={{ display: "none" }} 
            />
            <TextareaAutosize 
                name="text" 
                value={inputValues.text} 
                onChange={handleInputChange} 
                minRows={4} 
                placeholder="Write your post" 
                style={{ 
                    height: "15rem", 
                    width: "99%", 
                    padding: "0.5rem",
                    background: "#6a798952", 
                    fontSize: "1rem",
                }}
            />
            <Button 
                type="submit" 
                variant="contained" 
                style={{ background: "#212e3f"}}
            >
                Post
            </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default NewPost;