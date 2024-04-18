import axios from "axios";

const DB_BASE_API = "http://localhost:4000";
export const MOVIE_API = `${DB_BASE_API}/api/testMovies`;
export const REVIEWS_API = `${DB_BASE_API}/api/testReviews`;
export const USERS_API = `${DB_BASE_API}/api/users`;

const headers = {
  headers: {
    "X-RapidAPI-Key": "23cf5a5c76mshc3823944dba0eb5p158854jsn0cad955f4082",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

export const getMovieById = async (id) => {
  try {
    var movie = '';
    const url = `${MOVIE_API}/${id}`;
    const remoteUrlForTitle = `https://moviesdatabase.p.rapidapi.com/titles/${id}`
    const remoteUrlForActors = `https://moviesdatabase.p.rapidapi.com/titles/${id}/crew`
    const remoteUrlForRatings = `https://moviesdatabase.p.rapidapi.com/titles/${id}/ratings`
    console.log(id);
    const response = await axios.get(url);
    if(response.data == null){
      const [movieResponse, actorsResponse, ratingsResponse] = await Promise.all([
        axios.get(remoteUrlForTitle, headers),
        axios.get(remoteUrlForActors, headers),
        axios.get(remoteUrlForRatings, headers),
      ]);
      console.log(movieResponse)
      console.log(actorsResponse)
      console.log(ratingsResponse)
      movie = {
        title: movieResponse.data.results.titleText.text,
        primary_image: movieResponse.data.results.primaryImage ? movieResponse.data.results.primaryImage : {url: "https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp"},
        actors: actorsResponse.data.results ? actorsResponse.data.results : [],
        rating: ratingsResponse.data.results ? ratingsResponse.data.results.averageRating : "0",
      }
    }
    else {
      movie = response.data
    }
    console.log("movie", movie)
    return movie;
  } catch (error) {
    console.error(error);
  }
};

export const getUserReviews = async (movieId) => {
  try {
    const url = `${REVIEWS_API}/movie/${movieId}`;
    console.log(movieId);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findUserById = async (userId) => {
  try {
    const url = `${USERS_API}/${userId}`;
    console.log(userId);
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createReview = async (review) => {
  try {
    const response = await axios.post(`${REVIEWS_API}/review`, review);
    console.log("review", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
