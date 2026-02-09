import Form from '../../components/Forms/Form'
import { Api } from '../../Api'
import { usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import { jsRoutes } from '../../paths'

export default function MessageInput({chatId}) {
  const [ data, setData ] = useState({
    body: ""
  })
 
  const messageRef = useRef(null)
  const { authenticity } = usePage().props

  useEffect(() => {
    messageRef.current.focus()
  }, [chatId])

  const onSubmit =(e) => {
      e.preventDefault()
      if (!data.body) return
      let api = new Api()
      api.post({
        path: jsRoutes.chatMessagesPath(chatId),
        authenticityToken: authenticity.csrf_token,
        body: {
          message: data
        }
      })
      setData({body: ""})
      messageRef.current.focus()
  }
  return (
    <Form className="w-full" onSubmit={onSubmit}>
       <div className='relative w-full'>
              <div className='relative'>
                  <input ref={messageRef} onChange={e => setData(() => ({...data, body: e.target.value}))} value={data.body} type="text"  placeholder="Send a message" className="message-input w-full pl-8 border-0 rounded-full p-3 tracking-tight bg-white dark:color-white dark:placeholder-gray-400 dark:focus-bg-gray-500 dark:bg-gray-500"/>
              </div>
              <button className='absolute inset-y-0 start-2'>I</button>
              <button  type='submit' className="absolute inset-y-0 end-5 bg-red-400 z-50">Send mesage + icon</button>
          </div>
    </Form>
  )  
}