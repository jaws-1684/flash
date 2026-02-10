import React, { useEffect, useState } from 'react'
import { usePage }from '@inertiajs/react'
import useActionCable from '../../components/hooks/useActionCable'
import useChannel from '../../components/hooks/useChannel'
import { baseURI } from '../../paths'
import Layout from '../../components/Layouts/Layout'
import AppLayout from '../../components/Layouts/AppLayout'
import MessageGroup from './components/MessageGroup'
import Scrollable from '../../components/Containers/Scrollable'
import MessageInput from './components/MesageInput'

export default function Messages({chatId, chatMessages}) {
  const [messages, setMessages] = useState(chatMessages)

  const {actionCable} = useActionCable(baseURI.webSocket);
  const {subscribe, unsubscribe} = useChannel(actionCable);
  
  useEffect(() => {
    subscribe(
      { channel: `ChatChannel`, id: chatId },
      {
        received: data => {     
          const transform = {
              group_name: "",
              data: [data.message]
          }
          setMessages(prevMessages => [transform, ...prevMessages]);
        }
      },
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const noMessages = messages ?  <div className='flex justify-center items-center'>No messages start by sending some</div> : null
  
  
  return (
    <>
      <div className='h-20 bg-red-200'>

      </div>
     {
      messages  
      ? <Scrollable className='w-full flex flex-col-reverse justify-start items-start gap-4 overflow-scroll h-[74dvh] lg:h-[75dvh]'>
        {messages.map((group, index) => <MessageGroup group={group}/>)}
       </Scrollable> 
      : noMessages 
      }
      <MessageInput chatId={chatId}/>
    </>
     
        
  )
}

Messages.layout = (page) => { 
  return (<Layout title="Chats">
    <AppLayout children={page}/>
  </Layout>)
}