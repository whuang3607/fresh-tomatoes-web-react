import React, { useEffect, useState } from 'react'
import * as client from './client'
import './SearchPage.css'
import MovieInfoComponent from '../Details/index'
import { Link } from 'react-router-dom'
import PopularMovies from '../../components/Movie/popular'
const SearchPage = () => {
  const [movies, setMovies] = useState([])
  const [genre, setGenre] = useState('Comedy')
  const [type, setType] = useState('movie')

  const getMovies = async (selectedGenre, type) => {
    try {
      const response = await client.getTitles(selectedGenre, type)
      setMovies(response)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  useEffect(() => {
    getMovies(genre, type)
  }, [genre, type])

  const handleGenreChange = newGenre => {
    setGenre(newGenre)
    getMovies(newGenre, type)
  }

  const handleSelectChange = event => {
    const typeValue = event.target.value
    setType(typeValue)
  }

  return (
    <div className='search-page'>
      <div className='form'>
        <select
          class='form-select'
          aria-label='Default select example'
          onChange={handleSelectChange}
          value={type}
        >
          <option selected>Open this select menu</option>
          <option value='movie'>Movies</option>
          <option value='tvEpisode'>TVShows</option>
          <option value='short'>Short</option>
          <option value='podcastSeries'>Podcast Series</option>
          <option value='tvMiniSeries'>Mini Tv Series</option>
          <option value='videoGame'>Video Games</option>
        </select>
      </div>
      <h2 className='title'>Most Popular Genre</h2>
      <div className='genre-buttons'>
        {[
          'Action',
          'Drama',
          'Comedy',
          'Crime',
          'Adventure',
          'Fantasy',
          'Thriller',
          'Animation',
          'Sci-Fi',
          'Sport'
        ].map(g => (
          <button
            key={g}
            onClick={() => handleGenreChange(g)}
            className={genre === g ? 'active' : ''}
          >
            {g}
          </button>
        ))}
      </div>

      <div className='movie-container'>
        {movies.map(movie => (
          <div className='movie-card' key={movie.id}>
            <img
              src={
                movie.primaryImage
                  ? movie.primaryImage.url
                  : 'https://www.dotyeti.com/wp-content/uploads/2023/01/barbie.webp'
              }
              alt={movie.titleText.text}
              className='movie-image'
            ></img>
            <div className='movie-info'>
              <h3>{movie.titleText.text}</h3>
              <button>
                <Link to={`/detail/${movie.id}`} key={movie.id}>
                  {' '}
                  Details
                </Link>
              </button>
              <p>
                {movie.releaseYear && (
                  <p>Release Year: {movie.releaseYear.year}</p>
                )}
              </p>
              <p>{movie.titleType.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
