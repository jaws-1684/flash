import { Message } from "./ui/Message"
export default function MessageGroup({group}) {
  const {group_name, data} = group
  return <div className='w-full flex flex-col items-start justify-start gap-2'>
    {group_name && <p className='p-1 self-center bg-white text-xs rounded-lg dark:bg-gray-700 my-4 font-semibold text-gray-600 dark:text-inherit'>{group_name}</p>}
     <div className='messages flex flex-col-reverse w-full gap-4'>
        {data.map(message => <Message key={message.id} message={message}/>)}
      </div> 
  </div>
}