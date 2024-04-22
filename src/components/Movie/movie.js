import React from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import WatchlistButton from '../Watchlist';

const Movie = ({ id, title, imageUrl, userId }) => {
  let navigate = useNavigate();
  const movieDetail = {
    title: title,
    url: imageUrl,
  };
  return (
    <div className="im-movie-tile-style">
      <div>
        <img className="im-movie-poster mb-2" src={imageUrl} alt={title} />
      </div>
      <div>
        <div className="im-movie-title-section">
          <div className="im-movie-title">{title}</div>
          <WatchlistButton movieId={id} userId={userId} movie={movieDetail} />
          {/* take in /id, title, img, userId ... basically the entire movie./
          save this into watchlist db in mongo.
           */}
        </div>
        <div className="movie-info">
          <Link
            to={`/detail/${id}`}
            key={id}
            className="btn btn-primary"
            style={{ color: 'black', backgroundColor: 'yellow' }}
          >
            {' '}
            Details
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Movie;
