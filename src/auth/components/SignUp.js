import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class SignUp extends Component {
  constructor () {
    super()

    // sets the state of the following to empty
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // function to handle the form field inputs and change 'this.state' to the values
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  // signUp function, begins with page reload prevention
  signUp = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation} = this.state
    const { flash, history, setUser } = this.props

    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }
  
  // disabled all inputs for sign up

  render () {
    const { email, password, passwordConfirmation} = this.state

    return (
      <form className='auth-form' onSubmit={this.signUp}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
          disabled
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
          disabled
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
          disabled
        />
        <button type="submit"className="btn btn-success">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
