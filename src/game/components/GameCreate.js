import React, { Component } from 'react'

import { handleErrors, gameCreate } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class GameCreate extends Component {
  constructor () {
    super()

    // sets the state of the game number to empty
    this.state = {
      number: 1
    }
  }


  createGame = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    console.log(this.state)
    console.log(this.props.user)


    const { number } = this.state
    const { flash, user } = this.props
    // function to plus one to the this.state.number on each click
    this.setState({number: number + 1})
    // take the incremented 'number' state and pass as parameter to create 'game'
    gameCreate(number, user)
      .then(() => flash(messages.createSuccess, 'flash-success'))
      .catch(() => flash(messages.createFailure, 'flash-error'))

  }

  render () {
    const { number} = this.state

    return (
      <div className='game-create'>
        <h3>Create Game</h3>
        <button type="click" onClick={this.createGame}>DRAW!</button>
      </div>
    )
  }
}

export default GameCreate
