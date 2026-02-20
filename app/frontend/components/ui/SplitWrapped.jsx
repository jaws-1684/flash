import React from 'react'

function SplitWrapped({className, children}) {
  return (
   <div className={"w-full lg:w-1/2 border-r border-gray-200 dark:border-gray-700 px-2 flex-col flex justify-start py-4 " + className}>{children}</div>
  )
}

export default SplitWrapped