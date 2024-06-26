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

const headers2 = {
  method: "GET",
  url: "https://imdb146.p.rapidapi.com/v1/title/",
  params: {id: ""},
  headers: {
    'X-RapidAPI-Key': '60b48dd6ddmsh4cdb4dae5c0a232p140d26jsn0159cbb5ffe0',
    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
  }
}

let actorsList = []

let genreList = []

export const getMovieById = async (id) => {
  try {
    var movie = '';
    const url = `${MOVIE_API}/${id}`;
    const remoteUrlForTitle = `https://moviesdatabase.p.rapidapi.com/titles/${id}`
    // const remoteUrlForDescription = `https://moviedatabase8.p.rapidapi.com/FindByImbdId/${id}`
    // headers2.url = remoteUrlForDescription
    headers2.params.id = `${id}`
    // const remoteUrlForActors = `https://moviesdatabase.p.rapidapi.com/titles/${id}/aka`
    // const remoteUrlForRatings = `https://moviesdatabase.p.rapidapi.com/titles/${id}/ratings`
    // console.log(id);
    const response = await axios.get(url);
    if(response.data == null){
      const [movieResponse, descriptionResponse] = await Promise.all([
      // const [movieResponse, actorsResponse, ratingsResponse] = await Promise.all([
        axios.get(remoteUrlForTitle, headers),
        axios.request(headers2),
        // axios.get(remoteUrlForActors, headers),
        // axios.get(remoteUrlForRatings, headers),
      ]);
      // console.log(movieResponse.data.results)
      // console.log(actorsResponse.data)
      // console.log(ratingsResponse.data)
      // create a section for Genres!!!!
      // console.log(descriptionResponse.data[0])
      console.log(descriptionResponse.data)


      for (let i = 0; i < descriptionResponse.data.cast.edges.length; i++){
        if (i < descriptionResponse.data.cast.edges.length - 1){
          actorsList.push(descriptionResponse.data.cast.edges[i].node.name.nameText.text + ", ");          
        } else {
          actorsList.push(descriptionResponse.data.cast.edges[i].node.name.nameText.text);          
        }
      }
      // console.log(actorsList);

      for (let j = 0; j < descriptionResponse.data.genres.genres.length; j++){
        if (j < descriptionResponse.data.genres.genres.length - 1) {
          genreList.push(descriptionResponse.data.genres.genres[j].text + ", ");          
        } else {
          genreList.push(descriptionResponse.data.genres.genres[j].text);          
        }
      }
      // console.log(genreList);

      movie = {
        title: movieResponse.data.results.titleText.text,
        primary_image: movieResponse.data.results.primaryImage.url,
        release_year: movieResponse.data.results.releaseYear.year,
        description: descriptionResponse.data.plot?.plotText.plainText || "",
        actors: actorsList,
        genres: genreList,
        // rating: ratingsResponse.data.results ? ratingsResponse.data.results.averageRating : "0",
      }
      // console.log(movie.primary_image);
    }
    else {
      movie = response.data
    }
    // console.log("movie", movie)
    return movie;
  } catch (error) {
    console.error(error);
  }
};

export const getUserReviews = async (movieId) => {
  try {
    const url = `${REVIEWS_API}/movie/${movieId}`;
    // console.log(movieId);
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findUserById = async (userId) => {
  try {
    const url = `${USERS_API}/${userId}`;
    // console.log(userId);
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createReview = async (review) => {
  try {
    const response = await axios.post(`${REVIEWS_API}/review`, review);
    // console.log("review", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
