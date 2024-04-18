import './App.css'
import React from 'react'
import TopBar from './components/TopBar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Signin from './components/users/signin'
import Signup from './components/users/signup'
import Profile from './components/users/profile'
import Edit from './components/users/edit'
import Home from './pages/Home'
import UserTable from './components/users/allUsers'
import UserDeatils from './components/users/userDetailsPage'
import Reviews from './components/users/reviews'
import SearchPage from './pages/search'
import Watchlist from './pages/Watchlist'
import Account from './components/users/otherUsersProfile'
import MovieInfoComponent from './pages/Details'
import Search from './pages/SearchMovie'
import AddMovie from './pages/AddMovie'
import UserProfile from './pages/UserDetail'
function App () {
  const [adminMovies, setAdminMovies] = React.useState([])
  return (
    <Router>
      <div className='d-flex flex-column'>
        <TopBar />

        <Routes>
          <Route path='/' element={<Home adminMovies={adminMovies} />} />
          <Route path='/home' element={<Home adminMovies={adminMovies} />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/searchmovie' element={<Search />} />
          <Route path='/detail/:movieId' element={<MovieInfoComponent />} />
          <Route path='/userdetail/:userId' element={<UserProfile />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/UserDeatils' element={<UserDeatils />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/users' element={<UserTable />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route
            path='/addMovie'
            element={
              <AddMovie
                adminMovies={adminMovies}
                setAdminMovies={setAdminMovies}
              />
            }
          />
          <Route path='reviews' element={<Reviews />} />
          <Route path='/account/:userId?' element={<Account />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
