import React, { Component } from 'react'

import { roundIndex } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class RoundIndex extends Component {
  constructor () {
    super()

    this.state = {

    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  roundIndex = event => {
    event.preventDefault()

    const {  } = this.state
    const { flash, history, user } = this.props

    roundGet(this.state, user)
      .then(handleErrors)
      .then(() => flash(messages.changePasswordSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render () {
    const {  } = this.state

    return (
      <form className='auth-form'>
        <h3>Change Password</h3>
      </form>
    )
  }
}

export default RoundIndex
