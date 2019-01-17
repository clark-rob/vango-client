import React, { Component } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { roundDelete } from '../api'
import { Link } from 'react-router-dom'

// import { roundGet } from '../api'
// import messages from '../messages'
// import apiUrl from '../../apiConfig'

const RoundIndex = props => {

  const Rounds = props.rounds.map((round, index) => {
    const deleteRound = () => {
      roundDelete(round, props.user)
        .then(props.getAllRounds)
    }
    return (
      <div key={ round._id }>
        <h3><b>Phrase</b>: { round.phrase}</h3>
        <h5><b>Drawing</b>:</h5><CanvasDraw disabled saveData={ round.drawing } immediateLoading={ true }/>
        <div className="row">
          <Link to="/round-update" className="btn btn-warning mx-3">
            Update
          </Link>
          <button onClick={ deleteRound } type="submit" className="btn btn-danger">
          Delete
          </button>
        </div>
      </div>
    )
  })

  return (
    <div>
      { Rounds }
    </div>
  )
}


export default RoundIndex
