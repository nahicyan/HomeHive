import React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { UploadFile as UploadFileIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageUploadPreview = ({ uploadedImages, setUploadedImages }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file), // Use URL for preview
      file,
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedImages = Array.from(uploadedImages);
    const [removed] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, removed);
    setUploadedImages(reorderedImages);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Upload Images
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<UploadFileIcon />}
        sx={{
          background: "linear-gradient(135deg, #FF8C42, #FF6F00)",
          color: "#fff",
          mb: 2,
        }}
      >
        Select Images
        <input type="file" hidden multiple onChange={handleFileChange} />
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <Box
              display="flex"
              gap={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                overflowX: "auto",
                p: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              {uploadedImages.map((img, index) => (
                <Draggable key={img.id} draggableId={img.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        position: "relative",
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        src={img.id}
                        alt="Uploaded Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(img.id)}
                        sx={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ImageUploadPreview;
