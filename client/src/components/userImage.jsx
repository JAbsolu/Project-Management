import { Box } from "@mui/material";

const UserImage = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt={image}
        src={`http://localhost:3100/public/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
