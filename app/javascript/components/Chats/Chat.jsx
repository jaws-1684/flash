import React from 'react'

function Chat({chat, onClick, openTab}) {
  return (
    <div 
        className={`flex p-1 cursor-pointer ${openTab == chat.id ? "bg-gray-100 dark:bg-gray-100/10 rounded-md" : "hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:rounded-md"}`} 
        onClick={() => onClick(chat.id)}>

        <div className='flex w-full'>
            <div className='w-full flex items-center gap-2'>
                <img src={chat.avatar} className="rounded-full w-12 h-12" alt="chat-image" />

                <div className='flex w-full items-start justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-lg'>{chat.name}</h1>
                        <p className='text-sm text-gray-700'>last_message</p>
                    </div>
                  
                    <p className='text-sm text-gray-700 p-1'>2:58</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat

