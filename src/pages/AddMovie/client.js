import axios from "axios";

const DB_BASE_API = "http://localhost:4000";
export const MOVIE_API = `${DB_BASE_API}/api/moviesByAdmin`;

export const createMovie = async (titles) => {
  console.log(titles)

    try {
      const response = await axios.post(`${MOVIE_API}`, titles);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error creating movie:", error);
      throw error;
    }
  };

