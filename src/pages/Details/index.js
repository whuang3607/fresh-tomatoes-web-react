import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import * as client from './client';
import './Detail.css';
import useAuth from '../../components/users/authenticateUser';
import PopularMovies from '../../components/Movie/popular';

const MovieDetails = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [criticReviews, setCriticReviews] = useState([]);
  const [showUserReviews, setShowUserReviews] = useState(false);
  const [showCriticReviews, setShowCriticReviews] = useState(false);
  const { movieId } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState('');
  const [blogLink, setBlogLink] = useState('');
  const { currentUser } = useAuth();

  const createReview = async (e) => {
    e.preventDefault();
    const newUserReview = {
      userId: currentUser ? currentUser._id : null,
      movieId: movieId,
      rating: userRating,
      comment: userFeedback,
      blogLink: blogLink,
    };
    // console.log(newUserReview)
    try {
      const response = await client.createReview(newUserReview);
      // console.log(response);
      setUserReviews([...userReviews, newUserReview]);
      setUserRating(0);
      setUserFeedback('');
      setBlogLink('');
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  // const createBlogLink = (e) => {
  //   e.preventDefault();
  //   const newUserReview = {
  //     userId: currentUser ? currentUser._id : null,
  //     movieId: movieId,
  //     rating: userRating,
  //     feedback: userFeedback,
  //   };
  //   setUserReviews([...userReviews, newUserReview]);
  //   createReview(newUserReview)
  //   setUserRating(0);
  //   setUserFeedback("");
  // };

  const [movieData, setMovieData] = useState({
    title: 'The Color Purple',
    // actors: ['Alice Johnson', 'David Thompson'],
    // description: 'The Color Purple is a heartwarming drama...',
    // rating: 6.8,
    // primaryImage: {
    //   url: 'https://m.media-amazon.com/images/M/MV5BYjBkNGE0NGYtYmU5Ny00NjRiLTk5MmYtMWU4NzYxMDE4YWY4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
    // }
    primary_image:
      'https://m.media-amazon.com/images/M/MV5BYjBkNGE0NGYtYmU5Ny00NjRiLTk5MmYtMWU4NzYxMDE4YWY4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    release_year: '2016',
    description: '',
    genres: [],
    actors: [],
  });

  const getMovies = async () => {
    try {
      const response = await client.getMovieById(movieId);
      // console.log(response)
      setMovieData(response);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  const getUserReviews = async (movieId) => {
    try {
      const response = await client.getUserReviews(movieId);
      // console.log(response)

      const usersPromises = response.map(async (review) => {
        try {
          const userResponse = await client.findUserById(review.userId);
          return {
            ...review,
            username: userResponse.username,
          };
        } catch (error) {
          console.error('Error fetching user details:', error);
          return review;
        }
      });

      const usersWithDetails = await Promise.all(usersPromises);
      setUserReviews(usersWithDetails);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  useEffect(() => {
    getMovies(movieId);
    getUserReviews(movieId);
  }, [movieId]);

  const handleShowUserReviews = () => {
    setShowUserReviews(true);
    setShowCriticReviews(false);
  };

  if (!movieData) {
    return <div>Loading...</div>;
  }

  // console.log(movieData)
  // console.log(movieData.primaryImage?.url)
  // console.log(movieData.primary_image)

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={movieData.primary_image}
            alt={movieData.title}
            className="im-poster"
          />
        </div>
        <div className="col-md-8">
          <h1>{movieData.title}</h1>
          <p>Actors: {movieData.actors}</p>
          <p>Genres: {movieData.genres}</p>
          <p>Release Year: {movieData.release_year}</p>
          <p>Description: {movieData.description}</p>
          {/* <p>Actors: {movieData.actors.join(', ')}</p>
          <p>Description: {movieData.description}</p> */}
          {/* <p>Rating: {movieData.rating}</p> */}
          <button className="btn btn-primary" onClick={handleShowUserReviews}>
            Show Reviews
          </button>
          {/* <button
            className="btn btn-primary im-button"
            onClick={handleShowCriticReviews}
          >
            Show Critic Reviews
          </button> */}
          {currentUser && (
            <div>
              <h3>Add Your Review</h3>
              <div className="col-xs-3">
                <label htmlFor="userRating">Rating (out of 10):</label>
                <input
                  type="number"
                  className="form-control"
                  id="userRating"
                  min="0"
                  max="10"
                  value={userRating}
                  onChange={(e) => setUserRating(e.target.value)}
                />
              </div>
              <div className="col-xs-6">
                <label htmlFor="userFeedback">Feedback:</label>
                <textarea
                  className="form-control"
                  id="userFeedback"
                  rows="3"
                  value={userFeedback}
                  onChange={(e) => setUserFeedback(e.target.value)}
                ></textarea>
              </div>
              {currentUser.role == 'CRITIC' && (
                <div className="col-xs-6">
                  <label htmlFor="blogLink">Your blog:</label>
                  <input
                    type="String"
                    className="form-control"
                    id="blogLink"
                    value={blogLink}
                    onChange={(e) => setBlogLink(e.target.value)}
                  />
                </div>
              )}
              <div className="mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={createReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showUserReviews && (
        <div className="mt-4">
          <h2>User Reviews</h2>
          <ul className="list-group">
            {userReviews.map((review, index) => (
              <li key={index} className="list-group-item">
                <Link to={`/userdetail/${review.userId}`} key={review.userId}>
                  <h3>{review.username}</h3>
                </Link>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
                <p>{review.blogLink}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
