import React, { useState } from 'react'
import OpenEye from '../Icons/OpenEye'
import ClosedEye from '../Icons/ClosedEye'

function Eye({ inputRef }) {
  const [eyeClosed, setEyeClosed] = useState(false)
  const classes = "size-10 flex items-center hover:stroke-blue-700 z-20 px-3 cursor-pointer"
  const onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setEyeClosed(!eyeClosed)
    inputRef.current.setAttribute("type", eyeClosed ? "password" : "text")
  }
  return (
    eyeClosed ? <ClosedEye onClick={onClick} className={classes}/> : <OpenEye onClick={onClick} className={classes}/>
  )
}

export default Eye