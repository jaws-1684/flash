import React, { useEffect, useState } from 'react'
import { usePage }from '@inertiajs/react'
// import useActionCable from '../hooks/useActionCable'
// import useChannel from '../hooks/useChannel'
import { baseURI } from '../../paths'


function MessageGroup({group}) {
  const {group_name, data} = group
  return <div className='w-full flex flex-col items-start justify-start gap-2'>
    {group_name && <p className='p-1 self-center bg-white text-xs rounded-lg dark:bg-gray-700 my-4 font-semibold text-gray-600 dark:text-inherit'>{group_name}</p>}
     <div className='messages flex flex-col w-full gap-2'>
        {data.map(message => <Message key={message.id} message={message}/>)}
      </div> 
  </div>
}
function Message ({message}) {
  const  { current_user} = usePage().props

  return <p className={'p-3 rounded-lg bg-white dark:bg-gray-700 max-w-sm wrap-break-word ' + `${current_user.id == message.user_id ? "self-end" : ""}`}>
    {message.body}
  </p>
}
function Wrapper({children}) {
  return <div className='self-center w-full h-full flex items-center justify-center text-md'>{children}</div>
}
function MessagesContent({chatId, chatMessages}) {
  const [messages, setMessages] = useState(chatMessages)
  // const [messages, loading, setData ] = useDebouncedGet({
  //   query: chatId,  
  //   fn: jsRoutes.chatMessagesPath
  // })
  // const {actionCable} = useActionCable(baseURI.webSocket);
  // const {subscribe, unsubscribe} = useChannel(actionCable);
  
  // useEffect(() => {
  //   subscribe(
  //     { channel: `ChatChannel`, id: chatId },
  //     {
  //       received: data => {     
  //         const transform = {
  //             group_name: "",
  //             data: [data.message]
  //         }
  //         setMessages(prevMessages => [transform, ...prevMessages]);
  //       }
  //     },
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [chatId]);

  if (!messages.length) return <Wrapper>No messages start by sending some</Wrapper>
  
  
  return (
       <div className='w-full flex flex-col-reverse justify-start items-start gap-4 w-full overflow-scroll p-2 pr-8'>
          {messages.map((group, index) => <MessageGroup key={index} group={group}/>)}
       </div>    
  )
}

export default MessagesContent