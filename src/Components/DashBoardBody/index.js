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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Orders } from "../../helper";
import { useNavigate } from "react-router-dom";

function Section() {
  const [recProducts, setRectProducts] = useState([]);
  const navigate = useNavigate();
  const recentOrders = Orders.filter((item) => item.id < 5);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=12")
      .then((res) => setRectProducts(res.data));
  }, []);

  return (
    <Box className="sectionContainer">
      <Box className="recomended-header">Look Whats New...</Box>
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
      {recentOrders.length !== 0 ? (
        <>
          <Box className="recent-oreders-container">
            <Box className="recomended-header">Recent Orders...</Box>
            <Paper sx={{ width: isSmallScreen ? '100%' : '70%', overflow: "hidden" }}>
            <TableContainer
                sx={{
                  minWidth: isSmallScreen ? 340 : 1050,
                  maxWidth: 1050,
                  width: isSmallScreen ? 340 : "100%",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Ordered Date</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Order Status</TableCell>
                      <TableCell>Product image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((item) => {
                      return (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={item.id}
                        >
                          <TableCell
                            onClick={() => navigate(`/orders/${item?.id}`)}
                            align="center"
                          >
                            {item.id}
                          </TableCell>
                          <TableCell
                            onClick={() => navigate(`/orders/${item?.id}`)}
                          >
                            {item.productName}
                          </TableCell>
                          <TableCell
                            onClick={() => navigate(`/orders/${item?.id}`)}
                          >
                            {item.date}
                          </TableCell>
                          <TableCell
                            onClick={() => navigate(`/orders/${item?.id}`)}
                          >
                            {item.price}
                          </TableCell>
                          <TableCell
                            onClick={() => navigate(`/orders/${item?.id}`)}
                          >
                            {
                              <Button
                                color={
                                  item.status === "Delivered"
                                    ? "success"
                                    : "error"
                                }
                              >
                                {item.status}
                              </Button>
                            }
                          </TableCell>
                          <TableCell>
                            <img
                              style={{ width: "90px", height: "60px" }}
                              src={item.img}
                              alt="product"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <Box onClick={() => navigate("/orders")} className="all-orders">
            <Button color="success">View All...</Button>
          </Box>
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
