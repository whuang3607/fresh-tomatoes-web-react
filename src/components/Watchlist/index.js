import { useState, useEffect } from 'react';
import { CiBookmark } from 'react-icons/ci';
import './index.css';
import * as client from './client';

const WatchlistButton = ({ movieId, movie, userId }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const watchlist = await client.getWatchlist(userId);
        const isWatchlisted = watchlist.some(
          (item) => item.movieId === movieId
        );
        setClicked(isWatchlisted);
        // console.log('set clicked', isWatchlisted);
      } catch (error) {
        console.error('Error checking watchlist:', error);
      }
    };

    checkWatchlist();
  }, [userId, movieId, movie]);

  const addToWatchlist = async () => {
    if (userId == null) {
      console.log('Please log in');
    } else {
      console.log('in watchlist');
      try {
        // console.log('movie', movie);
        // const movieResponse = await client.getMovieTitle(movieTitle);
        await client.createWatchlist({
          userId: userId,
          movieId: movieId,
          movie: movie,
        });
        setClicked(!clicked);
      } catch {}
    }
  };

  return (
    <button
      className={
        clicked
          ? 'im-watchlist-filled btn btn-success'
          : 'im-watchlist-transparent btn btn-light'
      }
      onClick={() => addToWatchlist()}
    >
      <CiBookmark />
    </button>
  );
};

export default WatchlistButton;
