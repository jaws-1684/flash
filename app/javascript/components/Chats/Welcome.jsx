import React from 'react'
import { Welcome as WelcomeIcon} from '../../components/Icons/AppIcons';
function Welcome({currentUser}) {
  return (
   <div className='flex flex-col items-center justify-center gap-2'>
              <WelcomeIcon width={"15em"} height={"15em"} fill={"fill-logo dark:fill-gray-800"}/>
              <h1 className='text-5xl font-bold text-gray-800'>Hi, {currentUser?.username}!</h1>
              <p className='inline-flex items-center text-xl text-gray-700'>Start chatting with your friends now.</p>
            </div>
  )
}

export default Welcome