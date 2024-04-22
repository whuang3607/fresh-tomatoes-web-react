import React, { useEffect, useState } from 'react';
import * as client from './client';
import Movie from '../../components/Movie/movie';
import { useAuth } from '../../components/users/authenticateUser';

const Watchlist = () => {
  const [watchlistedMovies, setWatchlistedMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getWatchlistedMovies = async () => {
      try {
        const response = await client.getWatchlist(currentUser._id);

        const watchlistMovies = response.map((watchlistItem) => watchlistItem);

        setWatchlistedMovies(watchlistMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    if (currentUser) {
      getWatchlistedMovies();
    }
  }, [currentUser]);

  useEffect(() => {
    // console.log("watchlistedmovies", watchlistedMovies);
  }, [watchlistedMovies]);

  return (
    <div className="container">
      {
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {watchlistedMovies.map((movie) => (
            <Movie
              key={movie._id}
              id={movie._id}
              title={movie.movie.title}
              imageUrl={
                movie.movie.url
                  ? movie.movie.url
                  : 'https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp'
              }
              rating={movie.rating}
              userId={currentUser ? currentUser._id : null}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default Watchlist;
