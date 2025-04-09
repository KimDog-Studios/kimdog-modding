"use client";
import Navigation from "@/components/Navigation";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import freeMods from "@/config/FreeMods";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GameIcon from '@mui/icons-material/SportsEsports';
import AuthorIcon from '@mui/icons-material/Person';
import images from "@/config/HomeImages";
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
      setProgress(0);
    }, 15000); // Change slide every 15 seconds

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100 / 150));
    }, 100); // Update progress every 100ms

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        <Navigation />
      </div>
      <div className="mt-16"> {/* Adjust this value based on the height of your Navigation component */}
        <div className="relative w-full h-screen overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-5 rounded-lg text-center">
                <Typography variant="h4" component="h2" className="text-white">
                  {image.title}
                </Typography>
                <Typography variant="h6" component="p" className="text-white">
                  {image.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-4"
                  href={image.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.buttonText}
                </Button>
              </div>
            </div>
          ))}
          <div className="absolute top-0 right-0 h-full w-1 bg-black bg-opacity-50">
            <div className="h-full w-full bg-red-500 transition-height duration-150" style={{ height: `${progress}%` }} />
          </div>
        </div>

        <Container maxWidth="lg" className="mt-8">
          {/* Free Mods Section */}
          <Box className="mt-16 text-center">
            <Typography variant="h4" component="h2" gutterBottom className="font-bold">
              Free Mods
            </Typography>
            <Grid container spacing={4}>
              {freeMods.map((mod, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper className="p-8 rounded-lg shadow-lg">
                    <Image src={mod.image} alt={mod.title} className="w-full rounded-lg" width={500} height={300} />
                    <Typography variant="h6" component="h3" className="mt-4 font-bold">
                      {mod.title}
                    </Typography>
                    {Array.isArray(mod.description) ? (
                      mod.description.map((line, idx) => (
                        <Typography key={idx} variant="body1" className={`mt-${idx === 0 ? '2' : '0'}`}>
                          {line}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body1" className="mt-2">
                        {mod.description}
                      </Typography>
                    )}
                    <Box className="flex justify-center mt-2">
                      <GameIcon className="mr-2" />
                      <Typography variant="body2">
                        {mod.game}
                      </Typography>
                    </Box>
                    <Box className="flex justify-center items-center mt-2">
                      <AuthorIcon className="mr-2" />
                      <Typography variant="body2">
                        {mod.author}
                      </Typography>
                      {mod.author === "KimDog" && <CheckCircleIcon className="text-green-500 ml-2" />}
                    </Box>
                    <Box className="flex justify-around mt-4">
                      {mod.steamLink !== "#" && (
                        <Button
                          variant="contained"
                          color="primary"
                          href={mod.steamLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<Image src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-modding/main/public/assets/Steam.png" alt="Steam" className="w-5" width={20} height={20} />}
                        >
                          Steam Workshop
                        </Button>
                      )}
                      {mod.modsfireLink !== "#" && (
                        <Button
                          variant="contained"
                          color="primary"
                          href={mod.modsfireLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<Image src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-modding/main/public/assets/ModsFire.png" alt="Modsfire" className="w-5" width={20} height={20} />}
                        >
                          Modsfire
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Footer */}
          <footer className="mt-16 p-8 text-center bg-gray-800 text-white rounded-lg">
            <Typography variant="body1">
              &copy; {new Date().getFullYear()} KimDog Modding. All rights reserved.
            </Typography>
          </footer>
        </Container>
      </div>
    </div>
  );
}