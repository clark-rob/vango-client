import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

// links that appear after successful sign in
const authenticatedOptions = (
  <React.Fragment>
    <Link to="/rounds">Create Round</Link>
    {/* <Link to="/rounds">Show Rounds</Link> */}
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

// links that do not need authorization
const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

// links that are always showing
const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

// header function that creates the front page, it takes in a 'user' from props
// to be able to view user name
const Header = ({ user }) => (
  <header className="main-header">
    <h1>V.A.N.Go!</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span> /* if there is a user, show w/ welcome slogan w/ user's email */ }
      { user ? authenticatedOptions : unauthenticatedOptions /* sign in/out swap */}
      { alwaysOptions /* always shows in the header */}
    </nav>
  </header>
)

export default Header
