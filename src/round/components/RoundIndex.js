import React, { Component } from 'react'

import { roundDelete } from '../api'
import { Link } from 'react-router-dom'
import messages from '../messages'
import CanvasDraw from 'react-canvas-draw'

const RoundIndex = props => {

  const Rounds = props.rounds.map((round, index) => {
    // ---------------Delete function ---------------------
    const deleteRound = () => {
      if(round.owner === props.user._id) {
        // only deletes round if the owner matches the user id
        roundDelete(round, props.user)
          .then(props.getAllRounds)
          .then(() => props.flash(messages.deleteSuccess, 'flash-success'))
          .catch(() => props.flash(messages.deleteFailure, 'flash-error'))
      } else {
        props.flash(messages.userFailure, 'flash-error')
      }
    }


    return (
      <div className="each-round" key={ round._id }>
        <h3><b>Phrase</b>: { round.phrase}</h3>
        <h5><b>Drawing</b>:</h5>
        { round.drawing && <CanvasDraw
          catenaryColor="#fff"
          brushRadius= { 0 }
          canvasHeight={ 400 }
          canvasWidth={ 375 }
          disabled={ true }
          hideGrid={ true }
          lazyRadius={ 0 }
          saveData={ round.drawing || '' }
          immediateLoading={ true }
        /> }
        <div className="button-row">
          <Link to="/round-update" className="update-button btn btn-warning">
            Update
          </Link>
          <button onClick={ deleteRound } type="submit" className="delete-button btn btn-danger">
          Delete
          </button>
        </div>
      </div>
    )
  })
  
  return (
    <div>
      { Rounds && Rounds }
    </div>
  )
}


export default RoundIndex
