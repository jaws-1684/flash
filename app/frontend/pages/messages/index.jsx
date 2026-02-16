import React, { useEffect, useState, useRef } from "react";
import { Link, router } from "@inertiajs/react";
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

function debug(name, func) {
  console.log("============+" + name + "+====================")
  func()
  console.log("============+" + name + "+====================")
}
export default function Messages({ chatId, recipient, chatMessages }) {
  const [messages, setMessages] = useState(chatMessages);
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const { actionCable } = useActionCable(baseURI.webSocket);
  const { subscribe, unsubscribe } = useChannel(actionCable);

  const messageGroups = Object.entries(
    Object.groupBy(messages, ({ created_at }) => dateToWords(created_at)),
  );
  const containerRef = useRef(null);
  const dropDownRef = useRef(null)

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  debug("Messages state", () =>   console.log(messages))  

  useEffect(() => {
    subscribe(
      { channel: `ChatChannel`, id: chatId },
      {
        received: ({ message }) => {
          const prevMessages = [...messages]
          const messageIdx = prevMessages.findIndex(mes => mes.id === message.id)
       
          if (messageIdx != -1) {
            prevMessages.splice(messageIdx, 1, message)
            setMessages(() => prevMessages)
          } else {
            setMessages((prevMessages) => [message, ...prevMessages]);
          }
          
        },
      },
    );

    return () => {
      unsubscribe();
    };
  }, [chatId, messages]);
   
  useOutsideClick(() => setIsShowingOptions(false), dropDownRef)

  let content;
  if (messages.length > 0) {
    content = (
      <Scrollable
        ref={containerRef}
        className="message-container w-full flex flex-col-reverse justify-start items-start gap-4 overflow-scroll h-[74dvh] lg:h-[75dvh] pr-4"
      >
        {messageGroups.map(([time, messages]) => (
          <MessageGroup key={time} time={time} messages={messages} />
        ))}
      </Scrollable>
    );
  } else {
    content = (
      <div className="flex justify-center items-center h-[74dvh] lg:h-[75dvh]">
        No messages start by sending some
      </div>
    );
  }
  const dropDown = (
      <Dropdown classes="top-20 absolute right-0" ref={dropDownRef} title="Chat" >
        <Link
          className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
          href={jsRoutes.destroyChatPath(chatId)}
          method="delete"
        >
          <Trash width="1rem" height="1rem" className="fill-red-700" />
          <p>Delete conversation</p>
          
        </Link>
      </Dropdown>
  );

  return (
    <>
      <div className="h-20 p-2 flex justify-between items-center relative">
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
            avatar={recipient.avatar}
            alt="chat avatar"
          />
          <Name name={recipient.username} />
        </div>
        <IconButton onClick={() => setIsShowingOptions(!isShowingOptions)}>
          <Options width="1rem" height="1rem" className="dark:fill-white" />
        </IconButton>
        {isShowingOptions && dropDown}
      </div>
          {content}
      <MessageInput chatId={chatId} />
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
