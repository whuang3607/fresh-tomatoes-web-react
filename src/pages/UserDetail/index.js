import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './UserProfile.css'
import * as client from './client'
import { useAuth } from '../../components/users/authenticateUser'

import { FaUserCog } from 'react-icons/fa'

const UserProfile = () => {
  const [userReviews, setUserReviews] = useState([])
  const [userFollows, setUserFollows] = useState([])
  const [user, setUser] = useState([])
  const { userId } = useParams()
  const [isFollowing, setIsFollowing] = useState(false)
  const { currentUser } = useAuth()
  const [movies, setMovies] = useState([])

  const getUserReviews = async userId => {
    try {
      const response = await client.findReviewsByUserId(userId)
      const reviewsWithMovies = await Promise.all(
        response.map(async review => {
          const movieResponse = await client.getTitles(review.movieId)
          return { ...review, movieName: movieResponse.title }
        })
      )
      setUserReviews(reviewsWithMovies)
    } catch (error) {
      console.error('Error fetching user reviews:', error)
    }
  }

  // const checkIfUserIsFollowed = async () => {
  //   try {
  //     const isFollowed = await client.checkFollowStatus(currentUser ? currentUser._id : null, user.username)
  //     setIsFollowing(isFollowed)
  //   } catch (error) {
  //     console.error('Error checking follow status:', error)
  //   }
  // }


  const getUser = async userId => {
    try {
      const response = await client.findUserById(userId)
      setUser(response)
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
  const handleFollowClick = async () => {
    try {
      await client.followUnfollowUser(currentUser._id, user.username)
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('Error following/unfollowing user:', error)
    }
  }
  const getAllFollowers = async () => {
    try {
      const response = await client.getAllFollowers(userId)
      const followingArrays = response.map((follower) => follower.following);
      const allFollowers = [].concat(...followingArrays);
      setUserFollows([...new Set(allFollowers)]);
      console.log(userFollows)
    } catch (error) {
      console.error('Error following/unfollowing user:', error)
    }
  }
  useEffect(() => {
    getUser(userId)
    getUserReviews(userId)
    getAllFollowers()
    // checkIfUserIsFollowed()
  }, [])

  return (
    <div className='user-profile'>
      <div className='user-details'>
        <div className='user-image'>
          <FaUserCog className='user-icon' />
        </div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <span className='user-role'>{user.role}</span>
        <p className='user-email'>
          <i className='fas fa-envelope'></i> {user.email}
        </p>
        <button className='follow-btn' onClick={handleFollowClick}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
      <div className='user-reviews'>
        <h2>User reviews</h2>
        {userReviews.map((review, index) => (
          <div key={index} className='review'>
            <h4>{review.movieName}</h4>
            <div className='review-rating'>{review.rating}</div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className='user-reviews'>
        <h2>User follows</h2>
        {userFollows.map((review, index) => (
          <div key={index} className='review'>
            <p>{userFollows}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProfile
