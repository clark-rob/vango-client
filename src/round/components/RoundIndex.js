import React, { Component } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { roundDelete } from '../api'
// import Round from './Round.js'

// import { roundGet } from '../api'
// import messages from '../messages'
// import apiUrl from '../../apiConfig'

// class RoundIndex extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       error: null,
//       rounds: []
//     }
//   }
//
//   componentDidMount() {
//     const { flash, history, user } = this.props
//     const { rounds } = this.state
//
//     roundGet(user)
//       // .then(handleErrors)
//       .then(res => res.json())
//       // .then(res => console.log(res.rounds))
//       .then(
//         (result) => {
//           this.setState({
//             rounds: result.rounds
//           })
//         })
//     // (error) => {
//     //   this.setState({
//     //     error
//     //   })
//     // }
//       .then(() => flash(messages.showAllRoundsSuccess, 'flash-success'))
//       // .then(() => history.push('/'))
//       .catch(() => flash(messages.showAllRoundsFailure, 'flash-error'))
//   }
//
//   render () {
//     // console.log(this.componentDidMount)
//     const Rounds = this.state.rounds.map((data, _id) => {
//       return (
//         <Round key={ _id } data={ data } user={ this.props.user } flash={ this.props.flash }/>
//       )
//     })
//
//     return (
//       <div>
//         { Rounds }
//       </div>
//     )
//   }
// }
const RoundIndex = props => {

  const Rounds = props.rounds.map((round, index) => {
    // console.log(round._id)
    const deleteRound = () => {
      console.log(round.owner, props.user._id)
      roundDelete(round, props.user)
        .then(props.getAllRounds)
    }
    return (
      <div key={ round._id }>
        <h3><b>Phrase</b>: { round.phrase}</h3>
        <h5><b>Drawing</b>:</h5><CanvasDraw disabled saveData={ round.drawing }/>
        <div className="row">
          {/*<Link to="/round-update" className="btn btn-warning mx-3">
            Update
          </Link>*/}
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
