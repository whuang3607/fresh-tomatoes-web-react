import axios from 'axios';

const DB_BASE_API = process.env.DB_LINK || 'http://localhost:4000';
export const WATCHLIST_API = `${DB_BASE_API}/api/watchlist`;

export const getMovieTitle = async (movieTitle) => {
  try {
    // console.log('movie title', movieTitle);
    const response = await axios.get(`${DB_BASE_API}/api/movie/${movieTitle}`);

    return response.data;
  } catch (error) {
    console.log('response' + error);
  }
};

export const getWatchlist = async (userId) => {
  try {
    const response = await axios.get(`${WATCHLIST_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting watchlist:', error);
    throw error;
  }
};

export const createWatchlist = async (watchlist) => {
  try {
    console.log('watchlist', watchlist);
    const response = await axios.post(`${WATCHLIST_API}`, watchlist);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating watchlist:', error);
    throw error;
  }
};

export const deleteWatchlist = async (userId, movieId) => {
  try {
    const response = await axios.delete(
      `${WATCHLIST_API}/${userId}/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting watchlist:', error);
    throw error;
  }
};
