import React, { useState } from "react";
import "./index.css";
import { Orders } from "../../helper";
import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function OrdersBody() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [orderedProducts, setOrderedProducts] = useState(Orders);
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    const filterOrders = orderedProducts.filter((item) => item.id !== id);
    setOrderedProducts(filterOrders);
  };
  return (
    <div className="order-container">
      {Orders.length !== 0 ? (
        <>
          <Box className="orders">
            <Box
              style={{
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "10px",
                fontFamily: "auto",
              }}
            >
              All Orders...
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderedProducts.map((item) => {
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
                          <TableCell onClick={() => deleteHandler(item.id)}>
                            <DeleteOutlineIcon color="error" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </>
      ) : (
        <Box className="loader">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default OrdersBody;
