import React, { useState, useEffect } from "react";
import axios from "axios";
import MediaControlCard from "./MediaControlCard"; // Adjust the path as needed
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

function SongsList() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    artist: "",
    language: "",
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/songs/");
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleInputChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newSong.name);
    formData.append("artist", newSong.artist);
    formData.append("language", newSong.language);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/songs/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSongs([...songs, response.data]); // Update the list with the new place
      setOpen(false); // Close the modal
      setNewSong({
        name: "",
        artist: "",
        language: "",
      }); // Reset the form

      // Show success toast
      toast.success("Song added successfully!");
    } catch (err) {
      console.error("Error adding new song:", err);

      // Show error toast
      toast.error("Failed to add the song. Please try again.");
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
        <h2>Songs I like &#9829;</h2>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Song
        </Button>
      </div>
      <br></br>
      <div className="songs-container">
        {/* Apply the CSS class here */}
        {songs.map((song, index) => (
          <MediaControlCard
            key={index}
            title={song.name}
            artist={song.artist}
            albumCover={song.album_cover}
          />
        ))}

        {/* Modal for Adding a New Place */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Add new song</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={newSong.name}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Artist</FormLabel>
                    <Input
                      name="artist"
                      value={newSong.artist}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Input
                      name="language"
                      value={newSong.language}
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

export default SongsList;
