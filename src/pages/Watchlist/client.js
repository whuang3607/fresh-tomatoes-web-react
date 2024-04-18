import axios from "axios";

const DB_BASE_API ="http://localhost:4000";
export const GET_WATCHLIST_API = `${DB_BASE_API}/api/watchlist`;

export const getWatchlist = async (user) => {
  try {
    console.log(user);
    const response = await axios.get(`${GET_WATCHLIST_API}/${user}`);
    console.log("watchlist for user", response.data)
    return response.data; 
  } catch (error) {
    console.error("Error getting watchlist:", error);
    throw error;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${DB_BASE_API}/api/movies/${movieId}`);
    console.log("watchlist for user", response.data)
    return response.data; 
  } catch (error) {
    console.error("Error getting watchlist:", error);
    throw error;
  }
};

