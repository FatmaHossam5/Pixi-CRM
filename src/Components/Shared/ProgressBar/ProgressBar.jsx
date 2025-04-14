import React from 'react'

function ProgressBar({progress , color}) {
    const barStyle ={
        background : color,
        width:progress
    }
  return (
    <>
        <div className="px-progress-bar d-flex">
            <div className="px-bar">
               <div className="px-progress" style={barStyle}></div>
            </div>
            <div className="px-percentage"> {progress}</div>
        </div>
    </>
  )
}

export default ProgressBar