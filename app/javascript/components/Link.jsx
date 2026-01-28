import React from 'react'
import { Link as InertLink } from '@inertiajs/react'

function Link(props) {

  const {name, ...rest} = props
  return (
   <InertLink className="actions text-blue-700 cursor-pointer hover:text-blue-400" preserveState {...rest}>{name}</InertLink>
  )
}

export default Link