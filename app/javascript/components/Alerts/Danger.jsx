import React from 'react'
import Close from '../Icons/Close'
function Danger({text="", onClick}) {
  return (
   <div className="bg-red-100 flex border border-red-400 items-center text-red-700 px-4 py-3 rounded" role="alert">
    <p className='me-1'><strong className="font-bold">Holy smokes!</strong></p>
    
    <span className="block sm:inline"> {text}</span>
    <div>
      <Close fill="fill-red-900" onClick={onClick}/>
    </div>
    </div>
  )
}

export default Danger