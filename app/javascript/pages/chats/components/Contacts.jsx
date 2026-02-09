import React from 'react'
import { Link } from '@inertiajs/react'
import { jsRoutes } from '../../../paths'
import { Action } from './Action'
import Name from './ui/Name'
import Avatar from '../../../components/ui/Avatar'

function Contacts({chats}) {
   return (
    <>
    {chats.map(chat => 
        <Link key={chat.id} href={jsRoutes.chatMessagesPath(chat.id)}>
            <Action>  
                <Avatar className="size-12" avatar={chat.avatar} alt="chat avatar"/>

                <div className='flex w-full items-start justify-between'>
                    <div className='flex flex-col'>
                        <Name name={chat.name}/>
                        <p className='text-sm text-gray-700'>last_message</p>
                    </div>
                
                    <p className='text-sm text-gray-700 p-1'>2:58</p>
                </div>
            </Action>
        </Link>
    )}
    </>
    )
}

export default Contacts