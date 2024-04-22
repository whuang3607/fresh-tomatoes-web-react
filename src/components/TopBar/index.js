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
    <div style={{ backgroundColor: 'rgb(230, 15, 15)', fontSize: 'large'}}>
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

            <div className="navbar-brand-container d-flex justify-content-center align-items-center"> {/* New div container */}
              <Link to='/' className='navbar-brand' style={{ fontSize: '40px' }}>
                Fresh Tomatoes
              </Link>
              <img src={"https://png.pngtree.com/png-clipart/20230113/ourmid/pngtree-red-fresh-tomato-with-green-leaf-png-image_6561484.png"} 
              alt="Tomato" 
              style={{ width: '40px' }} /> {/* Tomato image */}
            </div>

            
            {/* <Link
              class='navbar-brand' to='/' 
              style={{ backgroundColor: 'rgb(230, 15, 15)', color: 'white'}}>
              Fresh Tomatoes
            </Link> */}
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
                <Link to='/home' style={{ backgroundColor: 'rgb(230, 15, 15)', color: 'white'}}>
                  Home <span class='sr-only'>(current)</span>
                </Link>
              </li>
              
              <li>
                {currentUser && currentUser.role != 'ADMIN' ? (
                  <Link to='/watchlist' style={{ backgroundColor: 'rgb(230, 15, 15)', color: 'white' }}>
                    Watchlist
                  </Link>
                ) : (
                  <></>
                )}
              </li>
              <li>
                <Link to='/search' style={{ backgroundColor: 'rgb(230, 15, 15)', color: 'white'  }}>
                  Search Movies
                </Link>
              </li>
              {currentUser && currentUser.role === 'ADMIN' && (
                <li>
                  <Link to='/addMovie' style={{ backgroundColor: 'rgb(230, 15, 15)', color: 'white'  }}>
                    Add Movie
                  </Link>
                </li>
              )}
            </ul>

            <ul class='nav navbar-nav navbar-right list-group'>
              <li>
                <form class='navbar-form navbar-left' role='search'>
                  <div class='form-group'>
                    <Link to={`/searchmovie`} className='im-icon' style={{color: 'white'}}>
                      <VscSearch />
                    </Link>

                    <Link
                      to={currentUser ? '/profile' : '/signin'}
                      onClick={handleUserIconClick}
                      className='im-icon' style={{color: 'white'}}
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
