import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

// links that appear after successful sign in
const authenticatedOptions = (
  <React.Fragment>
    {/*--------------Round Links---------------*/}
    <Link to="/round-create">Create Art</Link>
    <Link to="/rounds">Show Drawings</Link>
    {/*-----------Authorization Links------------*/}
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
    <Link to="/">V.A.N.Go!</Link>
  </React.Fragment>
)

// header function that creates the front page, it takes in a 'user' from props
// to be able to view user name
const Header = ({ user }) => (
  <header className="main-header">
    <div className="title-header">
      <h1>{ alwaysOptions /* always shows in the header */}</h1>
      <h6>{ user && <span>Welcome, {user.email}</span> /* if there is a user, show w/ welcome slogan w/ user's email */ }</h6>
    </div>
    <nav>
      { user ? authenticatedOptions : unauthenticatedOptions /* sign in/out swap */}
    </nav>
  </header>
)

export default Header
