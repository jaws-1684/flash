import React from 'react'

function Logo(props) {
  const {path, size, ...rest} = props
  return (
   <svg xmlns="http://www.w3.org/2000/svg" width={size || "1.5em"} height={size || "1.5em"} viewBox="0 0 216 432" {...rest}>
        <path className={path} d="M0 3h213l-85 170h85L64 429V237H0V3z"/>
    </svg>
  )
}

export default Logo