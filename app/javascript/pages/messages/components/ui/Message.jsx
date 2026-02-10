import { usePage } from "@inertiajs/react"

const messageVariants = {
  base: 'message p-2 lg:p-3 rounded-2xl w-3xs lg:w-sm wrap-break-word text-white',
  self: "self-end bg-blue-600 dark:bg-blue-700 shadow-lg shadow-blue-700/50",
  foreign: 'bg-gray-400 dark:bg-gray-700 shadow-lg shadow-gray-400/50 dark:shadow-gray-700/50'
}
export function Message ({message}) {
  const  { current_user} = usePage().props

  return <p className={messageVariants.base.concat(" ", `${current_user.id == message.user_id ? messageVariants.self : messageVariants.foreign}`)}>
    {message.body}
  </p>
}