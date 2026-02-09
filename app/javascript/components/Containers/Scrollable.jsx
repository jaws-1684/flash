import React from 'react'

function Scrollable({children, opts="max-h-100 lg:max-h-[100%]"}) {
  return (
    <div className={`scrollable flex flex-col  overflow-scroll border-gray-200 border-b-1 dark:border-gray-700 p-y-2 ${opts}`}>{children}</div>
  )
}

export default Scrollable