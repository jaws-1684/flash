import MessagesContent from "../../pages/chats/MessagesContent"
import MessageInput from "../../pages/chats/components/messages/MesageInput"
import { usePage } from "@inertiajs/react"
export default function MessageArea({messages}) {
  const { chat_id } = usePage().props
  return <div className='flex w-full h-full flex-col justify-end gap-4 items-start'>
    <MessagesContent chatId={chat_id} chatMessages={messages}/>
    <MessageInput chatId={chat_id}/>
  </div>
}

