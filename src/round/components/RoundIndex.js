import React, { Component } from 'react'

import { roundDelete } from '../api'
import { Link } from 'react-router-dom'
import messages from '../messages'
import CanvasDraw from 'react-canvas-draw'

class RoundIndex extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
    Rounds: ''
  }

  componentDidMount() {
    const { rounds, user, getAllRounds, flash } = this.props
    const Rounds = rounds.map((round, index) => {
      console.log(round, index)
      // function 'Rounds' takes in the 'props.rounds' and loops through each available 'round'
      // ---------------Delete function ---------------------
      const deleteRound = () => {
        if(round.owner === user._id) {
          // only deletes round if the owner matches the user id
          roundDelete(round, user)
          // api call to DELETE with parameters 'round' and 'user'
            .then(getAllRounds)
            // api call to GET
            .then(() => flash(messages.deleteSuccess, 'flash-success'))
            .catch(() => flash(messages.deleteFailure, 'flash-error'))
        } else {
          flash(messages.userFailure, 'flash-error')
        }
      }


      return (
        <div className="each-round" key={ round._id }>
          <h3><b>Phrase</b>: { round.phrase}</h3>
          <div className="canvas">
            <h5><b>Drawing</b>:</h5>
            <CanvasDraw
              catenaryColor="#fff"
              brushRadius= { 0 }
              canvasHeight={ 400 }
              canvasWidth={ 375 }
              disabled={ true }
              hideGrid={ true }
              lazyRadius={ 0 }
              imgSrc={ round.drawing }
              saveData={ round.drawing }
              loadTimeOffset={ 0 }
              immediateLoading={ true }
              ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
            />
          </div>
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
    console.log(Rounds)

    this.setState({ Rounds })
    // sets the state Rounds to be used in the render
  }

  render () {
    console.log(this.state.Rounds)
    const { Rounds } = this.state
    return (
      <div className="shown-rounds">
        { Rounds }
      </div>
    )
  }
}

export default RoundIndex
