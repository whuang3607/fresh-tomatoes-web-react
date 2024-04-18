import axios from "axios";

const BASE_API = "https://moviesdatabase.p.rapidapi.com";
export const TITLES_API = `${BASE_API}/titles`;
export const UPCOMING_API = `${BASE_API}/titles/x/upcoming`;
const DB_BASE_API ="http://localhost:4000";
export const WATCHLIST_API = `${DB_BASE_API}/api/watchlist`;

const headers = {
  headers: {
    "X-RapidAPI-Key": "23cf5a5c76mshc3823944dba0eb5p158854jsn0cad955f4082",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

export const getWatchlist = async(userId) => {
  try {
    const response = await axios.get(`${WATCHLIST_API}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting watchlist:", error);
    throw error;
  }
};


export const getTitles = async () => {
  const response = await axios.get(`${TITLES_API}`, headers);
  return response.data.results;
};

export const getUpcomingTitles = async () => {
  const response = await axios.get(`${UPCOMING_API}`, headers);
  return response.data.results;
};

export const getRating = async (id) => {
  try{
    const response = await axios.get(`${TITLES_API}/${id}/ratings`, headers);
    return response.data.results.averageRating;
  } catch(error) {
    return 5;
  }
  
};
