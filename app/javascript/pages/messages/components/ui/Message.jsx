import { usePage } from "@inertiajs/react"
import Image from "./Image"
import { useState } from "react"

const messageVariants = {
  base: 'message p-2 lg:p-3 rounded-2xl w-3xs lg:w-sm wrap-break-word text-white flex flex-col relative',
  self: "self-end bg-blue-600 dark:bg-blue-700 shadow-lg shadow-blue-700/50",
  foreign: 'bg-gray-400 dark:bg-gray-700 shadow-lg shadow-gray-400/50 dark:shadow-gray-700/50'
}

function ImageContainer({attached_images}) {
  if (!attached_images) return

  const [ isExpanded, setIsExpanded ] = useState(true)
  const firstImage = attached_images[0]
  const length = attached_images.length

  let expandButton = (<button onClick={() => setIsExpanded(true)} className="p-4 inline-flex hover:scale-110 items-center justify-center text-lg size-12 bg-gray-400 cursor-pointer rounded-full absolute inset-x-40 inset-y-15">
                        {attached_images?.length}
                    </button>)

  let content
  if (length == 1) {
    content = <Image key={firstImage} src={firstImage} alt="chat image" />
  } else if (length > 1 && !isExpanded) {
    content =  (<div className="relative">
                  <div className="bg-gray-200 z-50 blur-sm">
                    <Image key={firstImage} src={firstImage} alt="chat image" />
                  </div>
                  {expandButton}
              </div>)            
  } else if (length > 1 && isExpanded) {
    content =  <div className="relative w-full">
      <button onClick={() => setIsExpanded(false)} className="w-full bg-white/20 absolute rounded-md h-12 inline-flex justify-center items-center cursor-pointer">Close</button>
      <div className="flex flex-col max-w-sm gap-2">
        {attached_images.map(img => <Image key={img} src={img} alt="chat image" />)}
      </div>
    </div>
  }

  return content
} 
export function Message ({message}) {
 

  const  { current_user} = usePage().props
  const { body, attached_images } = message
  
  const classVariant = current_user.id == message.user_id ? messageVariants.self : messageVariants.foreign
  const className = messageVariants.base.concat(" ", classVariant)

  return <div className={className}>
      
      { body && <p>{body}</p> }

      <ImageContainer attached_images={attached_images}/>
      <p className="self-end text-xs text-gray-800">{message.created_at.slice(11, 16) || ""}</p>
     
    </div>
}