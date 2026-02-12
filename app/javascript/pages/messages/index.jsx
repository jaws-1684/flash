import React, { useEffect, useReducer, useState, useRef } from 'react'
import { Link }from '@inertiajs/react'
import useActionCable from '../../components/hooks/useActionCable'
import useChannel from '../../components/hooks/useChannel'
import { baseURI, jsRoutes } from '../../lib/paths'
import Layout from '../../components/Layouts/Layout'
import AppLayout from '../../components/Layouts/AppLayout'
import MessageGroup from './components/MessageGroup'
import Scrollable from '../../components/Containers/Scrollable'
import MessageInput from './components/MesageInput'
import Avatar from '../../components/ui/Avatar'
import Name from '../chats/components/ui/Name'
import { Options, Trash } from '../../components/Icons/AppIcons'
import IconButton from '../../components/ui/IconButton'

import { dateToWords } from '../../lib/dateToWords'

export default function Messages({chatId, recipient, chatMessages}) {
  const [messages, setMessages] = useState(chatMessages)
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const {actionCable} = useActionCable(baseURI.webSocket);
  const {subscribe, unsubscribe} = useChannel(actionCable);

  const messageGroups = Object.entries(Object.groupBy(messages, ({ created_at }) => dateToWords(created_at)))
  const containerRef = useRef(null)
  
  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
      console.log(element.scrollTop)
    }
  }, [messages])

  useEffect(() => {
    subscribe(
      { channel: `ChatChannel`, id: chatId },
      {
        received: ({ data }) => {
          setMessages(prevMessages => ([data, ...prevMessages]))
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);


  let content
  if (messages.length > 0) {
    content = <Scrollable ref={containerRef} className='w-full flex flex-col-reverse justify-start items-start gap-4 overflow-scroll h-[74dvh] lg:h-[75dvh] pr-4'>
        {messageGroups.map(([time, messages]) => <MessageGroup key={time} time={time} messages={messages}/>)}
       </Scrollable> 
  } else {
    content = <div className='flex justify-center items-center h-[74dvh] lg:h-[75dvh]'>No messages start by sending some</div>
  }
  const dropDown = <div className='p-4 bg-gray-200 dark:bg-gray-700 absolute top-20 right-0 rounded-sm z-50'>
                    <div className='flex gap-2 items-center'>
                      <Trash width="1rem" height="1rem" className="fill-red-700"/>
                      <Link className='p-2 bg-red-700 hover:bg-red-700/50 rounded-sm w-full text-white' href={jsRoutes.destroyChatPath(chatId)} method="delete">Delete chat</Link>
                    </div>
                  </div>
                  
  return (
    <>
      <div className='h-20 p-2 flex justify-between items-center relative'>
          <div className='flex gap-4 items-center justify-start'>
            <Avatar className="size-12" avatar={recipient.avatar} alt="chat avatar"/>
            <Name name={recipient.username}/>
          </div>
          <IconButton onClick={() => setIsShowingOptions(!isShowingOptions)}>
            <Options width="1rem" height="1rem" className="dark:fill-white"/>
          </IconButton>
          {isShowingOptions && dropDown}
            
      </div>
      {content}  
      <MessageInput chatId={chatId}/>
    </>
     
        
  )
}

Messages.layout = (page) => { 
  return (<Layout title="Chats">
    <AppLayout children={page}/>
  </Layout>)
}