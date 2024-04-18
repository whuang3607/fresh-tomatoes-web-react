import { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import "./index.css";
import * as client from "./client";

const WatchlistButton = ({movieTitle, userId}) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const watchlist = await client.getWatchlist(userId);
        const isWatchlisted = watchlist.some((item) => item.movieTitle === movieTitle);
        setClicked(isWatchlisted);
        console.log("set clicked", isWatchlisted);
      } catch (error) {
        console.error("Error checking watchlist:", error);
      }
    };

    checkWatchlist();
  }, [movieTitle, userId]);

  const addToWatchlist = async() => {
    if (userId == null) {
      console.log("Please log in");
    } else {
        
        console.log("in watchlist")
        try{
          const movieResponse = await client.getMovieTitle(movieTitle);
          await client.createWatchlist({userId: userId, movieId: movieResponse.movieId})
          setClicked(!clicked)
        } catch{

        }
        
    }
  };

  return (
    <CiBookmark
      className={clicked ? "im-watchlist-filled" : "im-watchlist-transparent"}
      onClick={() => addToWatchlist()}
    />
  );
};

export default WatchlistButton;
