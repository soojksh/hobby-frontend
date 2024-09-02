import React, { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "./PlaceCard"; // Adjust the path as needed
import Navbar from "./navbar";
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

function PlacesList() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    country: "",
    description: "",
    image: "",
    date: "",
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/places/");
        setPlaces(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewPlace({ ...newPlace, image: files[0] }); // Handle file input
    } else {
      setNewPlace({ ...newPlace, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newPlace.name);
    formData.append("country", newPlace.country);
    formData.append("description", newPlace.description);
    formData.append("image", newPlace.image); // Append the file directly
    formData.append("date", newPlace.date);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/places/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPlaces([...places, response.data]); // Update the list with the new place
      setOpen(false); // Close the modal
      setNewPlace({
        name: "",
        country: "",
        description: "",
        image: null,
        date: "",
      }); // Reset the form
    } catch (err) {
      console.error("Error adding new place:", err);
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
          paddingRight: "6rem",
          paddingLeft: "4rem",
        }}
      >
        <h2>Places I have visited</h2>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Place
        </Button>
      </div>
      <div className="songs-container">
        {places.map((place) => (
          <PlaceCard
            key={place.id} // Ensure you use a unique key
            placeId={place.id} // Pass the placeId to PlaceCard
            name={place.name}
            country={place.country}
            image={place.image}
            date={place.date}
          />
        ))}

        {/* Modal for Adding a New Place */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Create new place</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={newPlace.name}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input
                      name="country"
                      value={newPlace.country}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      value={newPlace.description}
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
                      inputprops={{ accept: "image/*" }}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      name="date"
                      type="date"
                      value={newPlace.date}
                      onChange={handleInputChange}
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

export default PlacesList;
