"use client";
import Navigation from "@/components/Navigation";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import freeMods from "@/config/FreeMods";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GameIcon from '@mui/icons-material/SportsEsports';
import AuthorIcon from '@mui/icons-material/Person';

const images = [
  {
    src: "https://media.discordapp.net/attachments/1343366518649524286/1343366765924712539/1.png?ex=67bd034b&is=67bbb1cb&hm=5c7250092a9841c2bca922ed996ae61d03dfac5fcd1e2457404d15edd0fd2295&=&format=webp&quality=lossless&width=1609&height=905",
    title: "Welcome to KimDog Modding",
    subtitle: "Your one-stop solution for all your modding needs",
    buttonText: "Get Started",
  },
  {
    src: "https://media.discordapp.net/attachments/1343366518649524286/1343366766822297641/2.png?ex=67bd034b&is=67bbb1cb&hm=81f9647eb4b8750387279457698c0cf642a71f569e313b117554a33e5fe76fcd&=&format=webp&quality=lossless&width=1609&height=905",
    title: "High-Quality Mods",
    subtitle: "Enhance your gaming experience with our top-notch mods",
    buttonText: "Learn More",
  },
  {
    src: "https://media.discordapp.net/attachments/1343366518649524286/1343366767585792020/3.png?ex=67bd034b&is=67bbb1cb&hm=3a7ed92b35bce3f81a4599e06d0e6ed1f9491c3487850d5ca749ed91a9aa5f79&=&format=webp&quality=lossless&width=1609&height=905",
    title: "Excellent Support",
    subtitle: "We provide 24/7 support for all our clients",
    buttonText: "Contact Us",
  },
];

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
    }, 150); // Update progress every 150ms

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div>
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Navigation />
      </div>
      <div style={{ marginTop: "64px" }}> {/* Adjust this value based on the height of your Navigation component */}
        <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: index === currentSlide ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            >
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0, 0, 0, 0.5)", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                <Typography variant="h4" component="h2" style={{ color: "#fff" }}>
                  {image.title}
                </Typography>
                <Typography variant="h6" component="p" style={{ color: "#fff" }}>
                  {image.subtitle}
                </Typography>
                <Button variant="contained" color="primary" size="large" style={{ marginTop: "1rem" }}>
                  {image.buttonText}
                </Button>
              </div>
            </div>
          ))}
          <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "5px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div style={{ height: `${progress}%`, width: "100%", backgroundColor: "red", transition: "height 0.15s linear" }} />
          </div>
        </div>

        <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
          {/* Free Mods Section */}
          <Box style={{ marginTop: "4rem", textAlign: "center" }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: "bold" }}>
              Free Mods
            </Typography>
            <Grid container spacing={4}>
              {freeMods.map((mod, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper style={{ padding: "2rem", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <img src={mod.image} alt={mod.title} style={{ width: "100%", borderRadius: "10px" }} />
                    <Typography variant="h6" component="h3" style={{ marginTop: "1rem", fontWeight: "bold" }}>
                      {mod.title}
                    </Typography>
                    {Array.isArray(mod.description) ? (
                      mod.description.map((line, idx) => (
                        <Typography key={idx} variant="body1" style={{ marginTop: idx === 0 ? "0.5rem" : "0" }}>
                          {line}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body1" style={{ marginTop: "0.5rem" }}>
                        {mod.description}
                      </Typography>
                    )}
                    <Box style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
                      <GameIcon style={{ marginRight: "0.5rem" }} />
                      <Typography variant="body2">
                        {mod.game}
                      </Typography>
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "0.5rem" }}>
                      <AuthorIcon style={{ marginRight: "0.5rem" }} />
                      <Typography variant="body2">
                        {mod.author}
                      </Typography>
                      {mod.author === "KimDog" && <CheckCircleIcon style={{ color: "green", marginLeft: "0.5rem" }} />}
                    </Box>
                    <Box style={{ display: "flex", justifyContent: "space-around", marginTop: "1rem" }}>
                      {mod.steamLink !== "#" && (
                        <Button variant="contained" color="primary" href={mod.steamLink} target="_blank" startIcon={<img src="https://cdn.discordapp.com/attachments/1324377833350627329/1343363481315053679/Steam_icon_logo.svg.png?ex=67bd003c&is=67bbaebc&hm=d95b055a57b76663036aa51a112e04cd2307215d8e717680e000a1c681a38a99&" alt="Steam" style={{ width: "20px" }} />}>
                          Steam Workshop
                        </Button>
                      )}
                      {mod.modsfireLink !== "#" && (
                        <Button variant="contained" color="primary" href={mod.modsfireLink} target="_blank" startIcon={<img src="https://cdn.discordapp.com/attachments/1324377833350627329/1343363674789646409/f-logo.png?ex=67bd006a&is=67bbaeea&hm=aebb92652e0e23871246ab3d2a31e6ce88ca610d2f9b1988827f8c76d5bd29cc&" alt="Modsfire" style={{ width: "20px" }} />}>
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
          <footer style={{ marginTop: "4rem", padding: "2rem", textAlign: "center", backgroundColor: "#333", color: "#fff", borderRadius: "15px" }}>
            <Typography variant="body1">
              &copy; {new Date().getFullYear()} KimDog Modding. All rights reserved.
            </Typography>
          </footer>
        </Container>
      </div>
    </div>
  );
}