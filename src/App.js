import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'
/* Authentication Imports */
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
/* Round Imports */
import RoundCreate from './round/components/RoundCreate'
import RoundIndex from './round/components/RoundIndex'
import RoundUpdate from './round/components/RoundUpdate'
/* Index Api */
import { roundGet } from './round/api'
import messages from './round/messages'


class App extends Component {
  constructor () {
    super()

    // sets the App's state of user to null & flash message to blank, type to null
    this.state = {
      user: null,
      flashMessage: '',
      flashType: null,
      rounds: []
    }
  }
  /*---------------Round Index Action-------------------*/
  getAllRounds = () => {
    // makes a call to the api to GET all 'rounds' once user is signed in
    roundGet(this.state.user)
      .then(res => res.ok ? res : new Error()) // if user, retrieve data, if not, throw error
      .then(res => res.json()) // render data into json
      .then(
        res =>
          this.setState({ // set state to retrieved 'rounds'
            rounds: res.rounds
          })
      )
      .catch(() => this.flash(messages.showAllRoundsFailure, 'flash-error'))
  }

  // sets user on sign up/in
  setUser = user => this.setState({ user }, this.getAllRounds)

  // clears user on sign out, returns user state to null
  clearUser = () => this.setState({ user: null })

  // flash message control
  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 4000)
  }

  render () {
    // removes the need to write 'this.state' on the following
    const { flashMessage, flashType, user } = this.state
    // React.Fragment does not render but shows everything, used instead of <div>
    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        <main className="view-window">
          <Route exact path='/' render={() => (
            <div className="home-screen">
              <h1>Welcome to <span className="vango-title">V.A.N.Go!</span></h1>
              <h3>The Drawing Application</h3>
              <hr/>
              <p>Just sign in above* and you will be on your way to creativity! Then click Create Art and insert your phrase formed of a <b>verb</b>, an <b>adjective</b> and a <b>noun</b>, then get to DRAWING!</p><br/>
              <p>(I have placed an email and password in Sign in for all to use on this demo.<br/>Thank You and enjoy!)</p>
            </div>
          )} />
          {/*--------------Authorization Routes---------------*/}
          <Route path='/sign-up' render={() => (
            <SignUp
              flash={this.flash}
              setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn
              flash={this.flash}
              setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut
              flash={this.flash}
              clearUser={this.clearUser}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword
              flash={this.flash}
              user={user} />
          )} />
          {/*--------------Rounds Routes---------------*/}
          <AuthenticatedRoute user={user} exact path='/round-create' render={() => (
            <RoundCreate
              getAllRounds={this.getAllRounds}
              flash={this.flash}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/rounds' render={() => (
            <RoundIndex
              getAllRounds={this.getAllRounds}
              rounds={this.state.rounds}
              flash={this.flash}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/round-update' render={() => (
            <RoundUpdate
              rounds={this.state.rounds}
              getAllRounds={this.getAllRounds}
              flash={this.flash}
              user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
