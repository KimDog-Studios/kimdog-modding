"use client";
import Navigation from '@/components/Navigation';
import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Card, CardMedia, Modal, Backdrop, Fade } from '@mui/material';
import screenshots from '@/config/Screenshots';

function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setImages(screenshots);
  }, []);

  const handleOpen = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Navigation />
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
            Gallery
          </Typography>
          <Grid container spacing={4} style={{ marginTop: '2rem' }}>
            {images.map((url, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card onClick={() => handleOpen(url)} style={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    image={url}
                    alt={`Screenshot ${index + 1}`}
                    sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              outline: 'none',
            }}
          >
            {selectedImage && (
              <img src={selectedImage} alt="Selected Screenshot" style={{ width: '100%', borderRadius: '10px' }} />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default GalleryPage;