import React from 'react'
import { VscAccount } from 'react-icons/vsc'
import { VscSearch } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import useAuth from '../users/authenticateUser.js'

const TopBar = () => {
  const navigate = useNavigate()
  const { currentUser, signout } = useAuth()

  const handleUserIconClick = () => {
    console.log('handle user icon')
    console.log(currentUser)
    if (currentUser) {
      console.log('if')
      navigate('/profile')
    } else {
      console.log('else')
      navigate('/signin')
    }
  }

  const handleSignout = async () => {
    await signout()
    navigate('/')
  }

  return (
    <div style={{ backgroundColor: 'black' }}>
      <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div class='container-fluid'>
          <div class='navbar-header'>
            <button
              type='button'
              class='navbar-toggle collapsed'
              data-toggle='collapse'
              data-target='#bs-example-navbar-collapse-1'
              aria-expanded='false'
            >
              <span class='sr-only'>Toggle navigation</span>
              <span class='icon-bar'></span>
              <span class='icon-bar'></span>
              <span class='icon-bar'></span>
            </button>
            <Link
              class='navbar-brand'
              to='/'
              style={{ backgroundColor: 'black' }}
            >
              IMDB
            </Link>
          </div>

          <div
            class='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'
          >
            <span class='sr-only'>Toggle navigation</span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
          </div>

          <div
            class='collapse navbar-collapse'
            id='bs-example-navbar-collapse-1'
          >
            <ul class='nav navbar-nav'>
              <li class='active'>
                <Link to='/home' style={{ backgroundColor: 'black' }}>
                  Home <span class='sr-only'>(current)</span>
                </Link>
              </li>
              
              <li>
                {currentUser && currentUser.role != 'ADMIN' ? (
                  <Link to='/watchlist' style={{ backgroundColor: 'black' }}>
                    Watchlist
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              <li>
                <Link to='/search' style={{ backgroundColor: 'black' }}>
                  Search Movies
                </Link>
              </li>
              {currentUser && currentUser.role === 'ADMIN' && (
                <li>
                  <Link to='/addMovie' style={{ backgroundColor: 'black' }}>
                    Add Movie
                  </Link>
                </li>
              )}
            </ul>

            <ul class='nav navbar-nav navbar-right list-group'>
              <li>
                <form class='navbar-form navbar-left' role='search'>
                  <div class='form-group'>
                    <Link to={`/searchmovie`} className='im-icon'>
                      <VscSearch />
                    </Link>

                    <Link
                      to={currentUser ? '/profile' : '/signin'}
                      onClick={handleUserIconClick}
                      className='im-icon'
                    >
                      <VscAccount />
                    </Link>
                  </div>
                </form>
              </li>
              {currentUser && (
                <li>
                  {}
                  <button onClick={handleSignout} className='btn btn-link'>
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default TopBar
