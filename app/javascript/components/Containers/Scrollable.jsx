import React from 'react'

function Scrollable({children, className="", ...rest}) {
  return (
    <div className={`scrollable overflow-scroll ${className}`} {...rest}>{children}</div>
  )
}

export default Scrollable