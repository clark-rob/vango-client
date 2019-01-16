import React from 'react'
import CanvasDraw from 'react-canvas-draw'

const Round = props => {
  const { drawing } = props.data
  console.log(drawing)
  // const loadableCanvas = drawing.loadSaveData()
  return(
    <div>
      <h3><b>Phrase</b>: { props.data.phrase}</h3>
      <h5><b>Drawing</b>:</h5><CanvasDraw disabled saveData={ drawing }/>
    </div>
  )
}

export default Round
