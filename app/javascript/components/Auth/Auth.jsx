import React, { Children } from 'react'
import ThemeToggle from '../ThemeToggle'

function Auth({children}) {
  return (
   <div className="auth min-h-screen max-w-screen p-2 flex flex-col bg-white dark:text-gray-200 dark:bg-gray-900">
  <div className="nav z-0 p-8 flex justify-between items-center">
    <div className="logo flex">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 216 432" className="fill-logo dark:fill-gray-200">
        <path d="M0 3h213l-85 170h85L64 429V237H0V3z"/>
      </svg>
      <h2 className="text-xl font-bold font-roboto dark:text-gray-200 text-logo">Flash</h2>
    </div>
    <div>{<ThemeToggle/>}</div>
  </div>
  <div className="box z-10 flex flex-col justify-center items-center grow-1">
    <div className="auth rounded-lg p-8 min-w-md h-max flex flex-col justify-center items-center ring shadow-xl ring-gray-900/5 dark:bg-gray-700/20  dark:border dark:border-gray-200/50">
      { children }
    </div>
  </div>
</div>
  )
}

export default Auth