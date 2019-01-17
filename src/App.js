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
    roundGet(this.state.user)
      // .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      // .then(res => console.log(res.rounds))
      .then(
        res =>
          this.setState({
            rounds: res.rounds
          })
      )
      // .then(console.log(this.state.rounds))
      .then(() => this.flash(messages.showAllRoundsSuccess, 'flash-success'))
      // .then(() => history.push('/'))
      .catch(() => this.flash(messages.showAllRoundsFailure, 'flash-error'))
    // console.log(res)
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
    }), 2000)
  }

  render () {
    // removes the need to write 'this.state' on the following
    const { flashMessage, flashType, user } = this.state
    // React.Fragment does not render but shows everything, used instead of <div>
    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        <main className="container">
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
          <AuthenticatedRoute user={user} path='/round-create' render={() => (
            <RoundCreate
              flash={this.flash}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/rounds' render={() => (
            <RoundIndex
              getAllRounds={this.getAllRounds}
              rounds={this.state.rounds}
              flash={this.flash}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/round-update' render={() => (
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
