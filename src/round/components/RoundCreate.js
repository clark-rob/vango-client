import React, { Component } from 'react'

import { roundCreate } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import CanvasDraw from 'react-canvas-draw'


class RoundCreate extends Component {
  constructor () {
    super()

    // sets the state of the game number to empty
    this.state = {
      number: 1,
      phrase: 'big runnning monkey',
      drawing: '',
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  createRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()

    const { number, phrase, drawing } = this.state
    const { flash, history, user } = this.props
    // function to plus one to the this.state.number on each click
    this.setState({number: number + 1})
    // take the incremented 'number' state and pass as parameter to create 'game'
    roundCreate(this.state.number, user)
      .then(() => flash(messages.createSuccess, 'flash-success'))
      .catch(() => flash(messages.createFailure, 'flash-error'))

  }

  render () {
    const { number} = this.state
    console.log(this.state)
    // console.log(this.props.user)

    return (
      <form className='round-' onSubmit={this.createRound}>
        <input
          required
          type="string"
          name="phrase"
          value={phrase}
          placeholder="Phrase"
          onChange={this.handleChange}
        />
        <CanvasDraw />
        <button type="click"></button>
      </form>
    )
  }
}

export default GameCreate
