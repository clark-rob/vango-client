import React from 'react'

const Round = props => {
  return(
    <div>
      <h3><b>Phrase</b>: { props.data.phrase}</h3>
      <h5><b>Drawing</b>: { props.data.drawing }</h5>
    </div>
  )
}

export default Round
