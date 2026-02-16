import { usePage } from "@inertiajs/react";
import ImageContainer from "./ImageContainer";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "../../../components/ui/IconButton";
import { Activity, useContext, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../../components/hooks/useOutsideClick";

const messageVariants = {
  base: "message p-2 rounded-2xl w-3xs lg:w-sm wrap-break-word text-white flex flex-col relative z-50",
  self: "self-end bg-blue-600 dark:bg-blue-700 shadow-lg shadow-blue-700/50",
  foreign:
    "bg-gray-400 dark:bg-gray-700 shadow-lg shadow-gray-400/50 dark:shadow-gray-700/50",
};

const MessageActionDropdown = ({isShowingDropdown, setIsShowingDropdown, messageId}) => {
  return (<div className="dropdown self-end absolute flex flex-col items-start justify-start">
        <div className="inline-flex items-start justify-end absolute right-0 top-0 bg-black/20 mask-x-from-50% mask-x-to-90% mask-b-from-50% mask-b-to-90% w-20 h-6"></div>
         <IconButton className="absolute right-0 top-0" onClick={() => {
              setIsShowingDropdown(!isShowingDropdown)
            }
          }>
          <FontAwesomeIcon icon={faAngleDown} />
          </IconButton>
       
        <Activity className="fixed" mode={isShowingDropdown ? "visible" : "hidden"}>Delete message</Activity>    
      </div>)
}
export function Message({ message }) {
  const [ isHovered, setIsHoverd ] = useState(false)
  const [ isShowingDropdown, setIsShowingDropdown ] = useState(false)
  const dropDownRef = useRef(null)

  useOutsideClick(() => {
    setIsShowingDropdown(false)
    setIsHoverd(false)
  }, dropDownRef)

  const { current_user } = usePage().props;
  const { body, attached_images } = message;

  const onMouseEnter = (e) => setIsHoverd(true)
  const onMouseLeave = (e) => !isShowingDropdown && setIsHoverd(false)

  const classVariant =
    current_user.id == message.user_id
      ? messageVariants.self
      : messageVariants.foreign;
  const className = messageVariants.base.concat(" ", classVariant);

  return (
    <div ref={dropDownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
      { isHovered && <MessageActionDropdown
                       messageId={message.id}
                       isShowingDropdown={isShowingDropdown}
                       setIsShowingDropdown={setIsShowingDropdown} 
                      /> }

      {body && <p>{body}</p>}

      <ImageContainer attached_images={attached_images} />
      <p className="self-end text-xs text-gray-800">
        {message.created_at.slice(11, 16) || ""}
      </p>
    </div>
  );
}
