import React from 'react'

const Round = props => {
  return(
    <div>
      <h4>Number: { props.body.number}</h4>
      <h4>Phrase: { props.body.phrase }</h4>
      <h4>Drawing: { props.body.drawing }</h4>
    </div>
  )
}

export default Round
