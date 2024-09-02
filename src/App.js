import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Movies from "./components/movies";
import Books from "./components/books";
import Songs from "./components/songs";
import Places from "./components/places";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/books" element={<Books />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/places" element={<Places />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
