"use client";
import Navigation from '@/components/Navigation';
import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Card, CardMedia, CardContent, Modal, Backdrop, Fade, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import screenshots from '@/config/Screenshots';
import Image from 'next/image';

function GalleryPage() {
  const [images, setImages] = useState<{ url: string, author: string, id: string, avatar: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [currentGallery, setCurrentGallery] = useState<string>('');

  useEffect(() => {
    // Initially, do not set images until the user makes a choice
  }, []);

  const handleOpen = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleDialogClose = (choice: string) => {
    setDialogOpen(false);
    setCurrentGallery(choice);
    if (choice === 'KimDog Network') {
      setImages(screenshots);
    } else {
      // Show nothing for KimDog Modding
      setImages([]);
    }
  };

  const getAvatarUrl = (id: string, avatar: string) => {
    const format = avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${format}?size=1024`;
  };

  const handleGallerySwitch = () => {
    setDialogOpen(true);
  };

  return (
    <div>
      <Navigation />
      <Dialog open={dialogOpen} onClose={() => handleDialogClose('KimDog Network')}>
        <DialogTitle>Choose Gallery</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please choose which gallery you want to view:</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose('KimDog Modding')} color="primary">
            KimDog Modding
          </Button>
          <Button onClick={() => handleDialogClose('KimDog Network')} color="primary">
            KimDog Network
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Box style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 'bold' }}>
              Gallery
            </Typography>
            <IconButton onClick={handleGallerySwitch} color="primary" style={{ marginLeft: '8px' }}>
              <SwapHorizIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            {currentGallery}
          </Typography>
          <Grid container spacing={4} style={{ marginTop: '2rem' }}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card style={{ cursor: 'pointer' }}>
                  <CardMedia
                    component="img"
                    image={image.url}
                    alt={`Screenshot ${index + 1}`}
                    sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
                    onClick={() => handleOpen(image.url)}
                  />
                </Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={image.author} src={getAvatarUrl(image.id, image.avatar)} />
                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: 'white', fontWeight: 'bold', marginLeft: '8px' }}>
                      {image.author}
                      {image.author === "kimdog_69" && (
                        <CheckCircleIcon style={{ color: 'green', marginLeft: '5px' }} />
                      )}
                    </Typography>
                  </Box>
                </CardContent>
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
              <Image src={selectedImage} alt="Selected Screenshot" layout="responsive" width={800} height={600} style={{ borderRadius: '10px' }} />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default GalleryPage;