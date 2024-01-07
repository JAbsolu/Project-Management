import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  AddAPhoto,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import UserImage from "../userImage";
import WidgetWrapper from "./WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  // const { title } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  // const dark = palette.neutral.dark;
  // const medium = palette.neutral.medium;
  // const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3100/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentUser) {
    return null;
  }

  const {
    firstName,
    lastName,
    title,
    userName,
    location,
    email,
    picturePath,
    tasks,
    teammates,
  } = currentUser;

  const team = null;

  return (
    <WidgetWrapper mt="-2.1rem" boxShadow={3}>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/dashboard`)}
      >
        <FlexBetween gap="1rem">
          {!picturePath ? (
            <AddAPhotoOutlinedIcon
              sx={{ fontSize: "2rem", "&:hover": { cursor: "pointer" } }}
            />
          ) : (
            <UserImage image={picturePath} />
          )}
          <Box>
            <Typography
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  // color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography>{tasks.length} Tasks</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" />
          <Typography>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" />
          <Typography>{title}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        {teammates ? (
          <FlexBetween>
            <Typography variant="p" sx={{ fontSize: "1.1rem" }}>
              Teammates
            </Typography>
            <Typography fontWeight="500">{teammates.length}</Typography>
          </FlexBetween>
        ) : (
          <FlexBetween>
            <Typography variant="p" sx={{ fontSize: "1.1rem" }}>
              Teammates
            </Typography>
            <Typography fontWeight="500">No teammates</Typography>
          </FlexBetween>
        )}

        {team ? (
          <FlexBetween>
            <Typography variant="p" sx={{ fontSize: "1.1rem" }}>
              Team
            </Typography>
            <Typography fontWeight="500">{team}</Typography>
          </FlexBetween>
        ) : (
          <FlexBetween>
            <Typography variant="p" sx={{ fontSize: "1.1rem" }}>
              Team
            </Typography>
            <Typography fontWeight="500">Not assigned</Typography>
          </FlexBetween>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
