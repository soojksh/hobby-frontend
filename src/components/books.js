import React, { useState, useEffect } from "react";
import axios from "axios";
import ImgMediaCard from "./ImgMediaCard"; // Adjust the path as needed
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

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    director: "",
    description: "",
    image: null, // Changed to null to handle file input
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/books/");
        setBooks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBook({ ...newBook, image: files[0] }); // Handle file input
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newBook.name);
    formData.append("author", newBook.author);
    formData.append("description", newBook.description);
    formData.append("image", newBook.image); // Add the image file to the form data

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/books/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBooks([...books, response.data]); // Update the list with the new place
      setOpen(false); // Close the modal
      setNewBook({
        name: "",
        director: "",
        description: "",
        image: null, // Reset the form
      });

      // Show success toast
      toast.success("Book added successfully!");
    } catch (err) {
      console.error("Error adding new book:", err);

      // Show error toast
      toast.error("Failed to add the book. Please try again.");
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
          paddingLeft: "4rem",
          paddingRight: "6rem",
          paddingBottom: "1rem",
        }}
      >
        <h2>Books I like &#9829;</h2>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
        >
          New Book
        </Button>
      </div>
      <div className="songs-container">
        {/* Apply the CSS class here */}
        {books.map((book, index) => (
          <ImgMediaCard
            key={index}
            name={book.name}
            author={book.author}
            image={book.image}
            description={book.description}
          />
        ))}

        {/* Modal for Adding a New Movie */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Add new Book</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={newBook.name}
                      onChange={handleInputChange}
                      autoFocus
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Author</FormLabel>
                    <Input
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      value={newBook.description}
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

export default BookList;
