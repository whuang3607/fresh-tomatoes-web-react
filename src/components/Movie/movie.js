import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import WatchlistButton from '../Watchlist'

const Movie = ({ id, title, imageUrl, rating, userId }) => {
  let navigate = useNavigate()
  return (
    <div className='im-movie-tile-style'>
      <div>
        <img className='im-movie-poster mb-2' src={imageUrl} alt={title} />
      </div>
      <div>
        <div className='im-movie-title-section'>
          <div className='im-movie-title'>{title}</div>
          <WatchlistButton movieTitle={title} userId={userId} />
        </div>
        <div className='movie-info'>
          <button>
            <Link to={`/detail/${id}`} key={id}>
              {' '}
              Details
            </Link>
          </button>
        </div>

        <div className='im-movie-title'>
          <FaStar className='im-star' />
          {rating}
        </div>
      </div>
    </div>
  )
}

export default Movie
