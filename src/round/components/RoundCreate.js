import React, { Component } from 'react'

import { roundPost } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import CanvasDraw from 'react-canvas-draw'


class RoundCreate extends Component {
  constructor (props) {
    super(props)

    // const { saveData } = this.props
    // sets the state of the round number ot zero, phrase and drawing to empty
    this.state = {
      number: 0,
      phrase: '',
      drawing: ''
    }
  }

  // handleChange = event => this.setState(
  //   { [event.target.name]: event.target.value })


  createRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    const { number, phrase, drawing } = this.state
    const { flash, user } = this.props
    const saved = this.saveableCanvas.getSaveData()

    // function to plus one to the this.state.number on each click
    this.setState({ number: number + 1, drawing: saved },
      () => {
        // console.log(this.state)
        roundPost(this.state, user)
          .then(() => flash(messages.createSuccess, 'flash-success'))
          // .then(this.saveableCanvas.clear())
          .catch(() => flash(messages.createFailure, 'flash-error'))
      })

    // take the incremented 'number' state and pass as parameter to create 'game'
    // takes saved canvas data, and sends it to be stringified to JSON using CanvasDraw callback
    // this.saveableCanvas.saveData()
    // this.setState({ drawing: saved })
    // console.log(saved)
    // console.log(this.state)
    // console.log(drawing)

    // roundPost(number, phrase, drawing, user)
    //   .then(() => flash(messages.createSuccess, 'flash-success'))
    //   // .then(this.saveableCanvas.clear())
    //   .catch(() => flash(messages.createFailure, 'flash-error'))
  }

  onPhraseChange = event => this.setState({ phrase: event.target.value })

  // onDrawingChange = event => this.setState({ drawing: this.saveableCanvas.getSaveData() })

  render () {
    const { number, phrase, drawing } = this.state
    // console.log(this.props.user)

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
