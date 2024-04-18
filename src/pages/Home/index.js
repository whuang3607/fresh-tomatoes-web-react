import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/users/authenticateUser";
import SearchPage from "../search/index";
import * as client from "./client";
import Movie from "../../components/Movie/movie";
import "./index.css";

const Home = ({ adminMovies }) => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [watchlistedMovies, setWatchlistedMovies] = useState([]);
  const [ratings, setRatings] = useState({});
  const { currentUser } = useAuth();

  const getMovies = async () => {
    try {
      const response = await client.getTitles();
      console.log(response);
      setMovies(response);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  const getUpcomingMovies = async () => {
    try {
      const response = await client.getUpcomingTitles();
      console.log(response);
      setUpcomingMovies(response);
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  const getRating = async (id) => {
    try {
      const response = await client.getRating(id);
      setRatings((prevRatings) => ({
        ...prevRatings,
        [id]: response,
      }));
    } catch (error) {
      console.error("Error fetching rating for movie with id", id, ":", error);
    }
  };

  // const getWatchlist = async (currentUser) => {
  //   try {
  //     const watchlist = await client.getWatchlist(currentUser ? currentUser._id : null);
  //     setWatchlistedMovies(watchlist);
  //   } catch (error) {
  //     console.error("Error checking watchlist:", error);
  //   }
  // }

  useEffect(() => {
    getMovies();
    getUpcomingMovies();
    const getWatchlistedMovies = async () => {
      try {
        console.log("current user", currentUser);
        console.log("watchlist page");
        const response = await client.getWatchlist(currentUser._id);
        console.log("Watchlist response:", response);
        const watchlistMovies = response.map((watchlistItem) => watchlistItem.movie);

        setWatchlistedMovies(watchlistMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    if (currentUser) {
      getWatchlistedMovies();
    }
  }, [currentUser]);

  useEffect(() => {
    const allMovies = [...movies, ...upcomingMovies];
    allMovies.forEach((movie) => {
      getRating(movie.id);
    });
  }, [movies, upcomingMovies]);

  return (
    <div className="container">
      {currentUser && (
        <div>
          <h4>Watchlisted Movies</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {watchlistedMovies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                imageUrl={
                  movie.primaryImage
                    ? movie.primaryImage.url
                    : "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp"
                }
                rating={movie.rating}
              userId={currentUser ? currentUser._id : null}
              />
            ))}
          </div>
        </div>
      )}

      <h4>Upcoming Movies</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {upcomingMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.titleText.text}
            imageUrl={
              movie.primaryImage
                ? movie.primaryImage.url
                : "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp"
            }
            rating={ratings[movie.id] || 0}
            userId={currentUser ? currentUser._id : null}
          />
        ))}
      </div>
      <h4>Recommended for you</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.titleText.text}
            imageUrl={
              movie.primaryImage
                ? movie.primaryImage.url
                : "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp"
            }
            rating={ratings[movie.id] || 0}
            userId={currentUser ? currentUser._id : null}
          />
        ))}
      </div>
      <h4>Other movies</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {adminMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={
              movie.primaryImage
                ? movie.primaryImage.url
                : "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp"
            }
            rating={ratings[movie.rating] || 0}
            userId={currentUser ? currentUser._id : null}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
