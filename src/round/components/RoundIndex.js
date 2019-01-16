import React, { Component } from 'react'
import Round from './Round.js'

import { roundGet } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class RoundIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      error: null,
      rounds: []
    }
  }

  componentDidMount() {
    const { flash, history, user } = this.props
    const { rounds } = this.state

    roundGet(user)
      // .then(handleErrors)
      .then(res => res.json())
      // .then(res => console.log(res.rounds))
      .then(
        (result) => {
          this.setState({
            rounds: result.rounds
          })
        })
    // (error) => {
    //   this.setState({
    //     error
    //   })
    // }
      .then(() => history.push('/'))
      .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render () {
    // console.log(this.state.rounds)
    const Rounds = this.state.rounds.map((data, _id) => {
      return (
        <Round key={ _id } data={data}/>
      )
    })

    return (
      <div>
        { Rounds }
      </div>
    )
  }
}

export default RoundIndex
