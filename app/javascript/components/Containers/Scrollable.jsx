import React from 'react'

function Scrollable({children, className=""}) {
  return (
    <div className={`scrollable overflow-scroll ${className}`}>{children}</div>
  )
}

export default Scrollable