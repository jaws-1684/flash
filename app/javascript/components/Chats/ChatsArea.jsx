import React from 'react'
import Chat from './Chat'


function ChatsArea({chats}) {
   console.count('ChatArea render')
  return (
     <div className='flex flex-col gap-2 mt-2'>
        {chats.map(chat => <Chat key={chat.id} chat={chat}/>)}
       </div>   
  )
}

export default ChatsArea