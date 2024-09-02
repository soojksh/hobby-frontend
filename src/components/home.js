import React from "react";
import PlacesList from "./places";
import MoviesList from "./movies";
import BookList from "./books";
import SongsList from "./songs";

const Home = () => {
  return (
    <div>
      <div className="content"></div>
      <PlacesList />
      <MoviesList />
      <BookList />
      <SongsList />
    </div>
  );
};

export default Home;
