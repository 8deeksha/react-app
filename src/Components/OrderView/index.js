import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import "./index.css";
import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Orders } from "../../helper";
import { Button, Modal, TextField } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 180,
  bgcolor: "background.paper",
  border: "1px solid #6666",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function OrderViewCard() {
  const [expanded, setExpanded] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");

  const location = useLocation();
  const currentPath = location.pathname.slice(8);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const orderedProduct = Orders.filter((item) => item.id === currentPath);
    setProductDetails(orderedProduct[0]);
  }, [currentPath]);

  const updateProduct = () => {
    setProductDetails((prev) => {
      return { ...prev, status: updateStatus };
    });
    setOpenModal(false)
  };

  return (
    <Box className="productViewContainer">
      <Card className="card-container" sx={{ maxWidth: 700 }}>
        <CardHeader
          title={productDetails?.productName}
          subheader={productDetails?.price}
        />
        <CardMedia
          className="product-img"
          component="img"
          height="194"
          image={productDetails?.img}
          alt="Paella dish"
        />
        <Box className="rating-container">
          <Rating name="read-only" value={4} readOnly />
          <span className="people-reviewed">512 people reviewed</span>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Button
              color={
                productDetails?.status === "Delivered" ? "success" : "error"
              }
            >
              {productDetails?.status}
            </Button>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => setOpenModal(true)}
            aria-label="add to favorites"
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>More About Product: </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box className="modal-header">Update Status</Box>
            <Box className="input-box">
              <TextField
                fullWidth={true}
                style={{ marginTop: "10px" }}
                label="Status"
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                autoComplete="current-password"
                variant="outlined"
              />
            </Box>
            <Box className="modalButton">
              <Button onClick={updateProduct} variant="contained">
                Update
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
}
