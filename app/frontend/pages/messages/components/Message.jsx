import { usePage } from "@inertiajs/react";
import ImageContainer from "./ImageContainer";
import { faAngleDown, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../../components/ui/IconButton";
import { Activity, useRef, useState } from "react";
import useOutsideClick from "../../../components/hooks/useOutsideClick";
import Dropdown from "./ui/Dropdown";
import { jsRoutes } from "../../../lib/paths";
import { Trash } from "../../../components/Icons/AppIcons";
import { api } from "../../../lib/Api";
import useMessage from "../../../components/hooks/useMessage";
import { formatTime } from "../../../lib/dateToWords";

const messageVariants = {
  base: "message p-2 rounded-2xl w-3xs lg:w-sm wrap-break-word text-white flex flex-col relative",
  self: "self-end bg-blue-600 dark:bg-blue-700 shadow-lg shadow-blue-700/50",
  foreign:
    "bg-gray-400 dark:bg-gray-700 shadow-lg shadow-gray-400/50 dark:shadow-gray-700/50",
};

const MessageActionDropdown = ({isShowingDropdown, setIsShowingDropdown, messageId, onEdit}) => {
  const { authenticity } = usePage().props

  const onDelete = () => {
    api.delete({
      path: jsRoutes.messagePath(messageId),
      authenticityToken: authenticity.csrf_token,
    })
  }
 
  return (<>
  <div className="dropdown self-end absolute flex flex-col items-start justify-start">
        <div className="inline-flex items-start justify-end absolute right-0 top-0 bg-black/20 mask-x-from-50% mask-x-to-90% mask-b-from-50% mask-b-to-90% w-20 h-6"></div>
         <IconButton className="absolute right-0 top-0" onClick={() => {
              setIsShowingDropdown(!isShowingDropdown)
            }
          }>
          <FontAwesomeIcon icon={faAngleDown} />
          </IconButton>     
  </div>
       <Activity className="relative" mode={isShowingDropdown ? "visible" : "hidden"}>
          <Dropdown classes="absolute z-50 right-20 lg:right-100 bg-red-200" title="Message">

            <div className="flex flex-col">
                <IconButton onClick={onDelete}
              className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
            >
              <Trash width="1rem" height="1rem"/>
              <p>Delete</p>
            </IconButton>
             <IconButton onClick={onEdit}
              className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
            >
             <FontAwesomeIcon icon={faPencil} />
              <p>Edit</p>
            </IconButton>
            </div>
          
          </Dropdown>
        </Activity> 
  </>)
}
export function Message({ message }) {
  const { current_user } = usePage().props;

  if (message.soft_deleted) {
    const position = current_user.id == message.user_id ? "self-end" : ""
    return <p className={"p-2 border-1 dark:border-gray-500  border-gray-200 rounded-xl rounded-md max-w-fit".concat(" ", position)}>This message was deleted</p>
  }

  const { setIsEditing } = useMessage()
  const [ isHovered, setIsHoverd ] = useState(false)
  const [ isShowingDropdown, setIsShowingDropdown ] = useState(false)
  const dropDownRef = useRef(null)

  useOutsideClick(() => {
    setIsShowingDropdown(false)
    setIsHoverd(false)
  }, dropDownRef)

  
  const { body, attached_images } = message;

  const onMouseEnter = (e) => setIsHoverd(true)
  const onMouseLeave = (e) => !isShowingDropdown && setIsHoverd(false)

  const onEdit = () => {
    setIsEditing(message.id, message.body)
  }
  const creator = current_user.id == message.user_id

  const classVariant =
      creator
      ? messageVariants.self
      : messageVariants.foreign;
  const className = messageVariants.base.concat(" ", classVariant);

  return (
    <div ref={dropDownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
      {message.edited && <p className="text-xs text-gray-900">Edited</p> }
      { creator && isHovered && <MessageActionDropdown
                       messageId={message.id}
                       isShowingDropdown={isShowingDropdown}
                       setIsShowingDropdown={setIsShowingDropdown}
                       onEdit={onEdit} 
                      /> }

      {body && <p>{body}</p>}

      <ImageContainer attached_images={attached_images} />
      <p className="self-end text-xs text-gray-800">
        {formatTime(message.created_at)}
      </p>
      
    </div>
  );
}
