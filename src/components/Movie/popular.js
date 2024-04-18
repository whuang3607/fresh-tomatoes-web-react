import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick'
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'

const PopularMovies = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://moviesdatabase.p.rapidapi.com/titles/?info=mini_info&list=top_boxoffice_200&sort=pos.incr',
          headers: {
            'X-RapidAPI-Key':
              'cb8a9b638dmsh374f7c8f8dc4c8cp161ff6jsn9845b2679a4e',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
          }
        })
        console.log(response)
        setMovies(response.data.results)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <div className='popular-movies-carousel'>
      {movies.length > 0 ? (
        <Slider {...settings}>
          {movies.map(movie => (
            <div key={movie.id}>
              <img
                style={{ width: '360px', height: '500px' }}
                src={movie.primaryImage.url}
                alt={movie.titleText.text}
              />
              <h3>{movie.titleText.text}</h3>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading movies...</p> // Or any other fallback content
      )}
    </div>
  )
}

export default PopularMovies
