import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '')

  useEffect(() => {
    if (searchTerm) {
      const fetchMovies = async () => {
        const options = {
          method: 'GET',
          url:
            'https://moviesdatabase.p.rapidapi.com/titles/search/title/' +
            searchTerm,
          params: { titleType: 'movie' },
          headers: {
            'X-RapidAPI-Key':
              'cb8a9b638dmsh374f7c8f8dc4c8cp161ff6jsn9845b2679a4e',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        }
        try {
          const response = await axios.request(options)
          setMovies(response.data.results) // Assuming the API response has a results array
        } catch (error) {
          console.error(error)
        }
      }

      fetchMovies()
    }
  }, [searchTerm])

  useEffect(() => {
    setSearchParams({ query: searchTerm })
  }, [searchTerm, setSearchParams])

  return (
    <div>
      <input
        type='text'
        className='form-control'
        placeholder='Search'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <br></br>
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

export default Search
