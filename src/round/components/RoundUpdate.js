import React, { Component } from 'react'

import { roundPatch } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'
import CanvasDraw from 'react-canvas-draw'


class RoundUpdate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      number: 0,
      phrase: '',
      drawing: '',
      _id: '',
      owner: ''
    }
  }

  componentDidMount() {
    // if the lenght of the rounds array is 0, flash message saying there are no rounds
    if (this.props.rounds.length === 0) {
      this.props.flash(messages.noRoundToShow, 'flash-warning')
    } else { // else show all rounds in the 'select dropdown' with the first index shown first, then begin the function changeRoundData
      const firstRound = this.props.rounds[0]._id
      this.changeRoundData(firstRound)
    }
  }

  changeRoundData = _id => {
    // sets a variable of 'round' to the specific round id that matches the selected id, the selected 'round''s state is then set as this.state
    const round = this.props.rounds.find(round => String(round._id) === String(_id))
    this.setState({
      number: round.number || '',
      phrase: round.phrase || '',
      drawing: round.drawing || '',
      _id: round._id,
      owner: round.owner
    })
  }

  onPhraseUpdate = event => {
    // once selected, if the name is matched to an id and the value of the id is sent to changeRoundData
    const { name, value } = event.target
    // if event.target selects an id
    if (name === 'id') {
      // change the
      this.changeRoundData(value)
    } else { // else the name and value are set as the state
      this.setState({ [name]: value })
    }
  }

  updateRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    const { number, phrase, drawing, owner } = this.state
    const { flash, user, rounds } = this.props
    // the canvas drawing is set to a variable of 'saved'
    const saved = this.saveableCanvas.getSaveData()
    // function to plus one to the this.state.number on each click
    this.setState({ number: number + 1, drawing: saved },
      () => {
        // this.state is set to a variable of data
        const data = { ...this.state }
        // allow update only if the curent state.owner matches the current user id
        if (owner === user._id) {
          // api call to PATCH
          roundPatch(data, user)
            .then(() => flash(messages.updateSuccess, 'flash-success'))
            // api call to GET all rounds
            .then(this.props.getAllRounds)
            .catch(() => flash(messages.updateFailure, 'flash-error'))
        } else {
          flash(messages.userFailure, 'flash-error')
        }
      })
  }

  render () {
    const { number, phrase, drawing } = this.state
    const SelectOptions = this.props.rounds.map((round, index) => {
      return (<option key={ index } value={ round._id }>{ round.phrase }</option>)
    } ,
    )
    return (
      <form className='round-update' onSubmit={this.updateRound}>
        <select
          name='id'
          onChange={ this.onPhraseUpdate }>
          { SelectOptions }
        </select>

        <div className="phrase-input">
          <input
            required
            type="string"
            name="phrase"
            value={phrase}
            placeholder='Your Word'
            onChange={this.onPhraseUpdate}
          />
        </div>

        <CanvasDraw
          required
          name="drawing"
          value={drawing}
          ref={ canvasDraw => (this.saveableCanvas = canvasDraw)}
          saveData={ drawing }
          immediateLoading={ true }
          brushRadius= { 8 }
          cavasHeight={ 400 }
          canvasWidth={ 375 }
          onChange={ this.onPhraseUpdate }
        />

        <button type="submit" className="update-btn btn btn-warning">Update</button>
      </form>
    )
  }
}

export default RoundUpdate
