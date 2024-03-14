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
import axios from "axios";
import Rating from "@mui/material/Rating";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UpdateProduct from "../UpdateProduct";

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

export default function ProductViewCard() {
  const [expanded, setExpanded] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [rating, setRating] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [updateImage, setUpdateImage] = useState();
  const [updateDesc, setUpdateDesc] = useState();
  const [updateCategory, setUpdatecategory] = useState();

  const location = useLocation();
  const currentPath = location.pathname.slice(10);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log(currentPath);
    axios
      .get(`https://fakestoreapi.com/products/${currentPath}`)
      .then((res) => {
        const { data } = res;
        setProductDetails(data);
        setRating(data?.rating?.rate);
        setUpdateTitle(data?.title);
        setUpdatePrice(data?.price);
        setUpdateImage(data?.image);
        setUpdateDesc(data?.description);
        setUpdatecategory(data?.category);
      });
  }, [currentPath]);

  const updateProduct = () => {
    const payload = {
      title: updateTitle,
      price: updatePrice,
      description: updateDesc,
      image: updateImage,
      category: updateCategory,
    };
    axios
      .put(`https://fakestoreapi.com/products/${currentPath}`, payload)
      .then(({ data }) => {
        setProductDetails(data);
        setUpdateTitle(data?.title);
        setUpdatePrice(data?.price);
        setUpdateImage(data?.image);
        setUpdateDesc(data?.description);
        setUpdatecategory(data?.category);
        setOpenModal(false)
      });
  };

  return (
    <Box className="productViewContainer">
      <Card className="card-container" sx={{ maxWidth: 700 }}>
        <CardHeader
          title={productDetails?.title}
          subheader={productDetails?.category}
        />
        <CardMedia
          className="product-img"
          component="img"
          height="194"
          image={productDetails?.image}
          alt="Paella dish"
        />
        <Box className="rating-container">
          <Rating name="read-only" value={rating} readOnly />
          <span className="people-reviewed">
            {productDetails?.rating?.count} people reviewed
          </span>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {productDetails?.description}
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
        <UpdateProduct
          openModal={openModal}
          setOpenModal={setOpenModal}
          updateTitle={updateTitle}
          setUpdateTitle={setUpdateTitle}
          updatePrice={updatePrice}
          setUpdatePrice={setUpdatePrice}
          updateImage={updateImage}
          setUpdateImage={setUpdateImage}
          updateDesc={updateDesc}
          setUpdateDesc={setUpdateDesc}
          updateCategory={updateCategory}
          setUpdatecategory={setUpdatecategory}
          updateProduct={updateProduct}
          title={'Update Product'}
        />
      )}
    </Box>
  );
}
