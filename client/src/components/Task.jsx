import * as React from 'react';
import { Box, Typography, useMediaQuery}  from "@mui/material"
import { useEffect } from 'react';
import { setUserTasks } from '../state';
import FlexBetween from './FlexBetween';
import NewPost from './newPost';
import PostsFeeds from './PostsFeeds';
import { useDispatch, useSelector } from "react-redux";
import CreateTaskModal from './CreateTaskModal';

const TaskComponent = ({ taskCreator, date, title, description, comments, isCompleted, priority }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userTasks = useSelector( (state) => state.user.tasks)

    const getUserTasks = async () => {
        try {
            const response = await fetch(`http://localhost:3100/tasks/${user._id}`, {
                method: "GET",
                "content-type": "application/json"
            });
            const data = await response.json();
            dispatch(setUserTasks({ tasks: data }));
        } catch (error) {
            console.error(`There was an error ${error}`);
        }
    }

    useEffect(() => {
        getUserTasks()
    }, [])

    let taskDateFormat = null;
    let taskTimeFormat = null;

    if (userTasks) {
        userTasks.map((task) => {
            let date = task.createdAt;
            let time = task.createdAt;
            date = date.slice(0, 10);
            taskDateFormat = date;

            time = time.slice(11, 16);
            taskTimeFormat = time;
        })
    }
    
    return (
        <Box sx={{
            mb: "1.5rem",
            background: "#212e3f",
            p: "1rem",
            borderRadius: "5px",
          }}>
            {userTasks && userTasks.userId == user._id ? 
                userTasks.map((task) => (
                    <Box>
                        <FlexBetween pb="0.75rem">
                            <Typography fontWeight="500" fontSize="0.85rem">
                                created by: { taskCreator = `${task.firstName} ${task.lastName}` }
                            </Typography>
                            <Typography fontWeight="500" fontSize="0.85rem">
                                created on: { date = `${taskDateFormat} at ${taskTimeFormat}` } 
                            </Typography>
                        </FlexBetween>
                        <Typography fontWeight="800" fontSize="1.2rem"
                            sx={{
                                mb: "0.3rem",
                                mt: "0.75rem",
                            }}
                        >
                            { title = task.title }
                         </Typography>
                        <Box
                            sx={{ 
                                // background: "#6a798952",
                                minHeight: "5rem",
                                p: "0.4rem",
                                mt: "0.75rem",
                                borderRadius: "5px"

                            }}
                        >
                            <Typography pt="0.2rem">
                                { description  = task.description }
                            </Typography>
                        </Box>
                        <FlexBetween sx={{ mt: "1rem"}}>
                            <Box>
                                { 
                                    task.comment ? (
                                        task.comment.map((comment) => {
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        padding: "0.55rem",
                                                        "&:hover": {
                                                            cursor: "pointer",
                                                            background: "#6a798952",
                                                            borderRadius: "5px",
                                                        }
                                                    }}
                                                >
                                                    0 comments
                                                </Typography>
                                                <PostsFeeds 
                                                    text={comment}
                                                />
                                            </Box>
                                            
                                        })
                                    ) : (
                                        <Box>
                                            <Typography
                                                sx={{
                                                    padding: "0.55rem",
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                        background: "#6a798952",
                                                        borderRadius: "5px",
                                                    }
                                                }}
                                            >
                                                0 comments
                                            </Typography>
                                        </Box>
                                    )
                                }
                            </Box>
                            <Typography
                                sx={{
                                    padding: "0.55rem",
                                    "&:hover": {
                                        cursor: "pointer",
                                        background: "#6a798952",
                                        borderRadius: "5px",
                                    }
                                }}
                            > 
                                Mark as completed{ isCompleted }
                            </Typography>
                            <Typography
                                sx={{
                                    padding: "0.55rem",
                                    "&:hover": {
                                        cursor: "pointer",
                                        background: "#6a798952",
                                        borderRadius: "5px",
                                    }
                                }}
                            > 
                                Priority { priority }
                            </Typography>
                        </FlexBetween>
                        <Box mt="1rem">
                            <Typography mb="0.3rem">
                                Add new comment
                            </Typography>
                            <NewPost />
                        </Box>
                </Box>
                )) : (
                    <Box>
                        <Typography>You do not have any tasks.</Typography>
                        <CreateTaskModal />
                    </Box>
                )
            }
        </Box>
    )
};

export default TaskComponent;