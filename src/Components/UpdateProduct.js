import { Box, Button, Modal, TextField } from '@mui/material'
import React from 'react'

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 450,
    bgcolor: "background.paper",
    border: "1px solid #6666",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function UpdateProduct({
    openModal,
    setOpenModal,
    updateTitle,
    setUpdateTitle,
    updatePrice,
    setUpdatePrice,
    updateImage,
    setUpdateImage,
    updateDesc,
    setUpdateDesc,
    updateCategory,
    setUpdatecategory,
    updateProduct,
    title
}) {
  return (
    <>
    <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box className="modal-header">{title}</Box>
          <Box className="input-box">
            <TextField
              fullWidth={true}
              style={{ marginTop: "10px" }}
              label="Title"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              fullWidth={true}
              style={{ marginTop: "10px" }}
              label="Price"
              value={updatePrice}
              onChange={(e) => setUpdatePrice(e.target.value)}
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              fullWidth={true}
              style={{ marginTop: "10px" }}
              label="Image Url"
              value={updateImage}
              onChange={(e) => setUpdateImage(e.target.value)}
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              fullWidth={true}
              style={{ marginTop: "10px" }}
              label="Description"
              value={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
              autoComplete="current-password"
              variant="outlined"
            />
            <TextField
              fullWidth={true}
              style={{ marginTop: "10px" }}
              label="Category"
              value={updateCategory}
              onChange={(e) => setUpdatecategory(e.target.value)}
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
    </>
  )
}

export default UpdateProduct