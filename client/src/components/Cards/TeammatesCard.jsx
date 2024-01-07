import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const TeammatesCards = ({ name, link, image, title }) => {
    return (
      <Link href={link} sx={{ textDecoration: "none" }}>
        <Card
          sx={{
            width: "8.87rem",
            margin: "0",
            height: "10rem",
            padding: "0.0rem",
          }}
        >
          <CardContent>
            <CardMedia component="img" width="80px" image={image} alt="user" />
            <Typography fontWeight="500" fontSize="0.95rem">
              {name}
            </Typography>
            <Typography fontSize="0.8rem">{title}</Typography>
          </CardContent>
        </Card>
      </Link>
    );
  };

  export default TeammatesCards;