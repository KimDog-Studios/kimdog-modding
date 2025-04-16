"use client";
import Navigation from "@/components/Navigation";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import downloads from "@/config/Downloads";
import images from "@/config/HomeImages";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof downloads[0] | null; direction: "asc" | "desc" }>({ key: null, direction: "asc" });

  const sortedDownloads = [...downloads].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";
    if (sortConfig.direction === "asc") {
      return String(aValue).localeCompare(String(bValue));
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (key: keyof typeof downloads[0]) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const getChevron = (key: keyof typeof downloads[0]) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

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
        <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 p-8 rounded-lg text-center max-w-lg">
                <Typography variant="h3" component="h1" className="font-bold mb-4">
                  {image.title}
                </Typography>
                <Typography variant="body1" className="mb-6">
                  {image.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="w-full"
                  href={image.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.buttonText || "Download Now"}
                </Button>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-red-500' : 'bg-gray-500'}`}
              />
            ))}
          </div>
        </div>

        <Container maxWidth="lg" className="mt-8">
          {/* Downloads Section */}
          <Box className="mt-16 text-center">
            <Typography variant="h4" component="h2" gutterBottom className="font-bold">
              Downloads
            </Typography>
            <Box className="mt-8 overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Name {getChevron("name")}
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleSort("game")}
                    >
                      Game {getChevron("game")}
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleSort("version")}
                    >
                      Version {getChevron("version")}
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleSort("size")}
                    >
                      Size {getChevron("size")}
                    </th>
                    <th
                      className="border border-gray-300 px-4 py-2 cursor-pointer"
                      onClick={() => handleSort("updated")}
                    >
                      Updated {getChevron("updated")}
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDownloads.map((download, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800 ' : 'bg-gray-800 '}`}>
                      <td className="border border-gray-300 px-4 py-2">{download.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{download.game}</td>
                      <td className="border border-gray-300 px-4 py-2">{download.version || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{download.size || "Unknown"}</td>
                      <td className="border border-gray-300 px-4 py-2">{download.updated || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Button
                          variant="contained"
                          color="primary"
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Container>

        <Container maxWidth="lg" className="mt-16">
          {/* About Section */}

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