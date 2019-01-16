import React, { Component } from 'react'
import Round from './Round.js'

import { roundGet } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class RoundIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
      rounds: []
    }
  }

  componentDidMount() {
    const { flash, history, user } = this.props
    const { rounds } = this.state
    // console.log(res.data.rounds)
    roundGet(user)
      // .then(handleErrors)
      .then(res => res.json())
      .then(res => console.log(res.rounds))
      .then(res => {
        this.setState({ rounds: res.rounds })
        return res
      })
      .then(console.log(this.state))
      // .then(() => history.push('/'))
      // .catch(() => flash(messages.changePasswordFailure, 'flash-error'))
  }

  render () {

    const Rounds = this.state.rounds.map((data, index) => {
      return (
        <Round key={ index } data={ data }/>
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
