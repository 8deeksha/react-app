import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import UpdateProduct from "../UpdateProduct";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [initailProducts, setInitialProducts] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [updateImage, setUpdateImage] = useState();
  const [updateDesc, setUpdateDesc] = useState();
  const [updateCategory, setUpdatecategory] = useState();
  const [openMessage,setOpenMessage] = useState(false)
  const [openErrMessage,setOpenErrMessage] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?sort=desc").then((res) => {
      setProducts(res.data);
      setInitialProducts(res.data);
    });
  }, []);

  const deleteHandler = (id) => {
    const filteredProducts = products.filter((item) => item.id !== id);
    setProducts(filteredProducts);
    setOpenDailog(false);
  };

  const deleteAlert = (id) => {
    setSelectedId(id);
    setOpenDailog(true);
  };

  const handleChange = (val) => {
    setValue(val);
    const searchProducts = products.filter((item) =>
      item.title.toLowerCase().includes(val.toLowerCase())
    );
    if (val) {
      setProducts(searchProducts);
    } else {
      setProducts(initailProducts);
    }
  };

  const updateProduct = () => {
    if (
      updateTitle ||
      updateCategory ||
      updateDesc ||
      updateImage ||
      updatePrice
    ) {
      const obj = {
        id: products.length+1,
        title: updateTitle,
        price: updatePrice,
        description: updateDesc,
        image: updateImage,
        category: updateCategory
      }
      setProducts((prevData) => [...prevData, obj]) 
      setOpenMessage(true);
      setOpenModal(false);
    } else {
      setOpenErrMessage(true)
    }
  };

  console.log(products)

  return (
    <>
      <Box className="search-product">
        <TextField
          className="search-product-input"
          style={{ marginTop: "10px" }}
          label="Search By Name"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="current-password"
          variant="outlined"
        />
        <Button onClick={() => setOpenModal(true)}>Add Product</Button>
      </Box>
      <Box className="products-container">
        {products.length !== 0 ? (
          products.map((item) => {
            return (
              <Box className="grid-box" key={item.id}>
                <Card sx={{ minWidth: 345, maxWidth: 345 }}>
                  <CardMedia
                    onClick={() => navigate(`/products/${item?.id}`)}
                    className="card-image"
                    sx={{ height: 200 }}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent>
                    <Tooltip title={item.title}>
                      <Typography
                        className="card-desc"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {item.title}
                      </Typography>
                    </Tooltip>
                    <Tooltip title={item.description}>
                      <Typography
                        className="card-desc"
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.description}
                      </Typography>
                    </Tooltip>
                  </CardContent>
                  <CardActions className="card-footer">
                    <Button
                      target="_blank"
                      href={`//api.whatsapp.com/send?phone=91MOBILE_NUMBER&text=${window.location.href}/products/${item.id}`}
                      size="small"
                    >
                      Share
                    </Button>
                    <Button
                      // onClick={() => navigate(`/products/${item?.id}`)}
                      size="small"
                    >
                      ${item.price}
                    </Button>
                    <Button onClick={() => deleteAlert(item.id)} size="small">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })
        ) : (
          <CircularProgress />
        )}
        <Dialog
          open={openDailog}
          keepMounted
          onClose={() => setOpenDailog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
          <DialogActions>
            <Button onClick={() => deleteHandler(selectedId)}>Yes</Button>
            <Button onClick={() => setOpenDailog(false)}>No</Button>
          </DialogActions>
        </Dialog>
      </Box>
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
          title={'Add Product'}
        />
      )}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openMessage} autoHideDuration={6000} onClose={()=>setOpenMessage(false)}>
        <Alert
          onClose={()=>setOpenMessage(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully Added Product
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openErrMessage} autoHideDuration={6000} onClose={()=>setOpenErrMessage(false)}>
        <Alert
          onClose={()=>setOpenErrMessage(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please fill all the required fields
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductsSection;
