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
          <Link to={`/detail/${id}`} key={id}  className='btn btn-primary' 
            style={{color: 'black', backgroundColor: 'yellow'}}>
            {' '}
            Details
          </Link>
        </div>

        <div className='im-movie-title'>
          <FaStar className='im-star' />
          {rating}
        </div>
        <br/>
      </div>
    </div>
  )
}

export default Movie
