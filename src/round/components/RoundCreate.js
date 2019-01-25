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

  createRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    const { number, phrase, drawing } = this.state
    const { flash, user, getAllRounds } = this.props
    const saved = this.saveableCanvas.getSaveData()
    // each setState adds one to the state.number, state.drawing will become 'saved' canvas array
    this.setState({ number: number + 1, drawing: saved },
      () => {
        const data = { ...this.state }
        // api call to create specified 'round'
        roundPost(data, user)
          .then(() => flash(messages.createSuccess, 'flash-success'))
          // canvas clears after form submit
          .then(this.saveableCanvas.clear())
          // phrase input clears on submit
          .then(this.setState({ phrase: '' }))
          // api call to GET all rounds
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
          className="phrase-input"
          type="string"
          name="phrase"
          value={phrase}
          placeholder='Your Verb, Adjective and Noun'
          onChange={this.onPhraseChange}
        />
        <CanvasDraw
          required
          name="drawing"
          value={drawing}
          ref={ canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushRadius= { 8 }
          canvasHeight={ 400 }
          canvasWidth={ 375 }
        />
        <input type="submit" className="create-button btn btn-success" value="Create"/>
      </form>
    )
  }
}

export default RoundCreate
