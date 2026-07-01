import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { InfiniteScroll, Link, router, usePage } from "@inertiajs/react";
import useActionCable from "../../components/hooks/useActionCable";
import useChannel from "../../components/hooks/useChannel";
import { baseURI, jsRoutes } from "../../lib/paths";
import Layout from "../../components/Layouts/Layout";
import AppLayout from "../../components/Layouts/AppLayout";
import MessageGroup from "./components/MessageGroup";
import Scrollable from "../../components/Containers/Scrollable";
import MessageInput from "./components/MesageInput";
import Avatar from "../../components/ui/Avatar";
import Name from "../chats/components/ui/Name";
import { Options, Trash } from "../../components/Icons/AppIcons";
import IconButton from "../../components/ui/IconButton";

import { dateToWords } from "../../lib/dateToWords";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import useOutsideClick from "../../components/hooks/useOutsideClick";
import Dropdown from "./components/ui/Dropdown";
import { useReducer } from "react";
import messageReducer from "./reducers/messageReducer";
import { Chats } from "../chats";

export const MessageContext = createContext(null)

export default function Messages({ chat, chat_messages, type, chats, group_chats }) {

  const [ messages, dispatch ] = useReducer(messageReducer, chat_messages)
  const { current_user } = usePage().props
  
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const { actionCable } = useActionCable(baseURI.webSocket)
  const { subscribe, unsubscribe } = useChannel(actionCable)

  const  scrollableRef = useRef(null)

  const [ currentMessage, setCurrentMessage ] = useState({
    body: "",
    lastMessageBody: "",
    id: null,
    isEditing: false
  })
  
  const scrollToBottom = (behavior="auto") => {
    const element = scrollableRef.current
    if (element) {
      const scrollHeight = element.scrollHeight
      element.scrollTo({
      top: scrollHeight,
      behavior: behavior,
    })
    }
    
  }
  useEffect(() => {
    scrollToBottom()
  }, [])
  const messageGroups = Object.entries(
    Object.groupBy(messages, ({ created_at }) => dateToWords(created_at)),
  );

  const dropDownRef = useRef(null)
  

  

  const chatId = chat.id

  let name
  let recipient  
  let channel
  let destroyLink

  switch(type) {
    case "group":
      name = chat.name
      channel = "ChatGroupChannel"
      destroyLink = chat.user_id === current_user.id && <Link
          className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
          href={jsRoutes.destroyChatGroupPath(chatId)}
          method="delete"
        >
          <Trash width="1rem" height="1rem" className="fill-red-700" />
          <p>Delete Group</p>
          
        </Link> 
      break
    default:
      recipient = chat.recipient
      name = recipient.username
      channel = "ChatChannel"
      destroyLink = recipient.id != current_user.id && <Link
          className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
          href={jsRoutes.destroyChatPath(chatId) }
          method="delete"
        >
          <Trash width="1rem" height="1rem" className="fill-red-700" />
          <p>Delete conversation</p>
          
        </Link> 
  }

 

  useEffect(() => {
    subscribe(
      { channel: channel, id: chatId },
      {
        received: ({ message }) => {
          dispatch({
          type: 'update',
          payload: message
        })},
      },
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);
   
  useOutsideClick(() => setIsShowingOptions(false), dropDownRef)
  const scrollableClassBase = "scrollable message-container w-full flex flex-col-reverse justify-start items-start gap-4 p-4 lg:p-8 overflow-scroll overflow-x-hidden"
  const scrollableClass = currentMessage.isEditing ? scrollableClassBase + " blur-md pointer-events-none" : scrollableClassBase

  let content;
  if (messages.length > 0) {
    content = (
      <Scrollable
        ref={scrollableRef}
        className={scrollableClass}
      >
      
        {messageGroups.map(([time, messages]) => (
          <MessageGroup key={time} time={time} messages={messages} />
        ))}
  
      </Scrollable>
    );
  } else {
    content = (
      <div className="message-container flex justify-center items-center h-full">
        No messages start by sending some
      </div>
    );
  }
  const dropDown = (
      <Dropdown classes="top-20 absolute right-0" ref={dropDownRef} title={name} >
        { destroyLink }
      </Dropdown>
  );

  return (
    <>
      <MessageContext value={{ currentMessage, setCurrentMessage, type, scrollToBottom }}>
        <div className="hidden lg:block w-1/2 p-4 border-r border-gray-200 dark:border-gray-700">
          <Chats chats={chats} group_chats={group_chats}/>
        </div>
        <div className="message-area flex flex-col gap-4 relative w-full lg:w-3/4">
          <div className="sticky z-50 top-0 h-20 p-2 flex justify-between items-center relative bg-white dark:bg-fgray">
            <div className="flex gap-4 items-center justify-start">
              <IconButton
                className="cursor-pointer"
                onClick={() => router.visit("/")}
              >
                <FontAwesomeIcon
                  className="hover:fill-red-200"
                  icon={faAngleLeft}
                />
              </IconButton>

              <Avatar
                className="size-12"
                avatar={chat?.recipient?.avatar_image || chat?.avatar_image}
                alt="chat avatar"
              />
              <Name name={name} />
            </div>
            <IconButton onClick={() => setIsShowingOptions(!isShowingOptions)}>
              <Options width="1rem" height="1rem" className="dark:fill-white" />
            </IconButton>
            {isShowingOptions && dropDown}
         </div>

         
            {content}
            <MessageInput chatId={chatId} />
      </div>
      </MessageContext>
    </>
  );
}

Messages.layout = (page) => {
  return (
    <Layout title="Chats">
      <AppLayout children={page} />
    </Layout>
  );
};
