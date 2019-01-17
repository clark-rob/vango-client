// import React from 'react'
// import CanvasDraw from 'react-canvas-draw'
// import messages from '../messages'
// import { roundDelete } from '../api'
//
// const Round = props => {
//   // console.log(props)
//   const deleteRound = () => {
//     roundDelete(props.data._id, props.user)
//       .then(() => props.flash(messages.deleteSuccess, 'flash-success'))
//       .catch(() => props.flash(messages.deleteFailure, 'flash-failure'))
//   }
//
//   return(
//     <div>
//       <h3><b>Phrase</b>: { props.data.phrase}</h3>
//       <h5><b>Drawing</b>:</h5><CanvasDraw disabled saveData={ props.data.drawing }/>
//       <div className="row">
//         {/*<Link to="/round-update" className="btn btn-warning mx-3">
//           Update
//         </Link>*/}
//         <button onClick={ deleteRound } type="submit" className="btn btn-danger">
//         Delete
//         </button>
//       </div>
//     </div>
//   )
// }
//
// export default Round
