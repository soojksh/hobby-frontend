import React, { useState, useEffect } from "react";
import axios from "axios";
import ImgMediaCard from "./ImgMediaCard"; // Adjust the path as needed
import Navbar from "./navbar";
import "./songs.css";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    name: "",
    director: "",
    description: "",
    image: null, // Changed to null to handle file input
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/movies/");
        setMovies(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewMovie({ ...newMovie, image: files[0] }); // Handle file input
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newMovie.name);
    formData.append("director", newMovie.director);
    formData.append("description", newMovie.description);
    formData.append("image", newMovie.image); // Add the image file to the form data

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/movies/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMovies([...movies, response.data]); // Update the list with the new place
      setOpen(false); // Close the modal
      setNewMovie({
        name: "",
        director: "",
        description: "",
        image: null, // Reset the form
      });

      // Show success toast
      toast.success("Movie added successfully!");
    } catch (err) {
      console.error("Error adding new movie:", err);

      // Show error toast
      toast.error("Failed to add the movie. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingLeft: "4rem",
          paddingRight: "6rem",
        }}
      >
        <h2>Movies I like &#9829;</h2>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Movie
        </Button>
      </div>
      <div className="songs-container">
        {movies.map((movie, index) => (
          <ImgMediaCard
            key={index}
            name={movie.name}
            director={movie.director}
            image={movie.image}
            description={movie.description}
          />
        ))}

        {/* Modal for Adding a New Movie */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Add new movie</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={newMovie.name}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Director</FormLabel>
                    <Input
                      name="director"
                      value={newMovie.director}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      value={newMovie.description}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Image</FormLabel>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleInputChange}
                      inputprops={{ accept: "image/*" }} // Corrected typo here
                      required
                    />
                  </FormControl>

                  <Button type="submit">Submit</Button>
                </Stack>
              </form>
            </DialogContent>
          </ModalDialog>
        </Modal>
      </div>
      <br />
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default MoviesList;
