import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./index.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { recentOrders } from "../../helper";
import { useNavigate } from "react-router-dom";
// import ViewProduct from "../ProductsBody/ViewProduct";

function Section() {
  const [recProducts, setRectProducts] = useState([]);
  // const [openDrwer, setOpenDrawer] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=12")
      .then((res) => setRectProducts(res.data));
  }, []);

  return (
    <Box className="sectionContainer">
      <Box className="recomended-header">Looks Whats New...</Box>
      <Box className="card-container">
        {recProducts.length !== 0 ? (
          recProducts.map((item) => {
            return (
              <Box className="grid-box" key={item.id}>
                <Card sx={{ maxWidth: 345 }}>
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
                      href={`//api.whatsapp.com/send?phone=91MOBILE_NUMBER&text=${window.location.href}products/${item.id}`}
                      size="small"
                    >
                      Share
                    </Button>
                    <Button
                      onClick={() => navigate(`/products/${item?.id}`)}
                      size="small"
                    >
                      ${item.price}
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </Box>
      {recProducts.length !== 0 ? (
        <>
          <Box className="recent-oreders-container">
            <Box className="recomended-header">Recent Orders...</Box>
            <TableContainer className="orders-table">
              <Table
                sx={{ minWidth: 450, maxWidth: 1200 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell>Fat&nbsp;(g)</TableCell>
                    <TableCell>Carbs&nbsp;(g)</TableCell>
                    <TableCell>Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{<Button color={item.status === 'Delivered' ? 'success' : 'error'}>{item.status}</Button>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className="all-orders">See All...</Box>
        </>
      ) : (
        <Box className="loader">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Section;
