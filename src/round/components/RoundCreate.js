import React, { Component } from 'react'

import { roundPost } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import CanvasDraw from 'react-canvas-draw'


class RoundCreate extends Component {
  constructor (props) {
    super(props)

    // sets the state of the round number ot zero, phrase and drawing to empty
    this.state = {
      number: 0,
      phrase: '',
      drawing: ''
    }
  }

  clearForm = () => {
    this.setState(prevState => {
      const nextState = {}
      for(const key in prevState) {
        nextState[key] = ''
      }
    })
  }

  createRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    const { number, phrase, drawing } = this.state
    const { flash, user, getAllRounds } = this.props
    const saved = this.saveableCanvas.getSaveData()

    // function to plus one to the this.state.number on each click
    this.setState({ number: number + 1, drawing: saved },
      () => {
        const data = { ...this.state }
        console.log(this.props)
        roundPost(data, user)
          .then(() => flash(messages.createSuccess, 'flash-success'))
          .then(this.saveableCanvas.clear())
          .then(getAllRounds)
          .catch(() => flash(messages.createFailure, 'flash-error'))
      })
  }

  onPhraseChange = event => this.setState({ phrase: event.target.value })

  render () {
    const { number, phrase, drawing } = this.state

    return (
      <form className='round-create' onSubmit={this.createRound}>
        <input
          required
          type="string"
          name="phrase"
          value={phrase}
          placeholder='Your Word'
          onChange={this.onPhraseChange}
        />
        <CanvasDraw
          required
          name="drawing"
          value={drawing}
          ref={ canvasDraw => (this.saveableCanvas = canvasDraw)}
        />
        <button type="submit">Create</button>
      </form>
    )
  }
}

export default RoundCreate
