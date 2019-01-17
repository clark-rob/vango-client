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
      _id: ''
    }
  }

  componentDidMount() {
    console.log(this.props)
    const firstRound = this.props.rounds[0]._id
    this.changeRoundData(firstRound)
    // const { flash, user } = this.props
    // const { rounds } = this.state
    // const data = this.props.match.params.id
    // console.log(data)
    // oneRoundGet(data, user)
    // // console.log(event.target._id)
    //   // .then(handleErrors)
    //   .then(res => res.json())
    //   // .then(res => console.log(res.rounds))
    //   .then(
    //     (result) => {
    //       this.setState({
    //         number: result.rounds.number,
    //         phrase: result.rounds.phrase,
    //         drawing: result.rounds.drawing
    //       })
    //     })
    //   .then(() => flash(messages.showAllRoundsSuccess, 'flash-success'))
    //   // .then(() => history.push('/'))
    //   .catch(() => flash(messages.showAllRoundsFailure, 'flash-error'))
  }

  changeRoundData = _id => {
    const round = this.props.rounds.find(round => String(round._id) === String(_id))
    this.setState({
      number: round.number || '',
      phrase: round.phrase || '',
      drawing: round.drawing || '',
      _id: round._id
    })
  }
  onPhraseUpdate = event => {
    const { name, value } = event.target
    if (name === 'id') {
      this.changeRoundData(value)
    } else {
      this.setState({ [name]: value })
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
  updateRound = event => {
    // function, begins with page reload prevention
    event.preventDefault()
    const { number, phrase, drawing } = this.state
    const { flash, user } = this.props
    const saved = this.saveableCanvas.getSaveData()

    // function to plus one to the this.state.number on each click
    this.setState({ number: number + 1, drawing: saved },
      () => {
        const data = { ...this.state }
        // console.log(data)
        roundPatch(data, user)
          .then(() => flash(messages.createSuccess, 'flash-success'))
          .then(this.saveableCanvas.clear()) .then(this.clearForm)
          .then(this.props.getAllRounds)
          .catch(() => flash(messages.createFailure, 'flash-error'))
      })
  }


  render () {
    const { number, phrase, drawing } = this.state
    // console.log(this.props.user)
    const SelectOptions = this.props.rounds.map((round, index) => {
      return (<option key={ index } value={ round._id }>{ round.phrase } (ID: { round._id })</option>)
    })
    return (
      <form className='round-update' onSubmit={this.updateRound}>
        <select
          name='id'
          onChange={ this.onPhraseUpdate }>
          { SelectOptions }
        </select>

        <input
          required
          type="string"
          name="phrase"
          value={phrase}
          placeholder='Your Word'
          onChange={this.onPhraseUpdate}
        />

        <CanvasDraw
          required
          name="drawing"
          value={drawing}
          ref={ canvasDraw => (this.saveableCanvas = canvasDraw)}
        />
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default RoundUpdate