import React from 'react'
import MessageArea from '../../components/Messages/MessageArea'
import { Link } from '@inertiajs/react'

export default function Messages({messages}) {
    console.log(messages)
  return (<>
    <Link href={"/"}>Back</Link>
    <div className={'bg-gray-200 dark:bg-fblack lg:flex flex-col lg:w-[70%] min-w-md items-center justify-center p-4'}>
        <MessageArea messages={messages}/>
     </div>   
  </>
    
  )
}

