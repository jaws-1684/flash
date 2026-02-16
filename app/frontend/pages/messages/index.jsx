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

  useEffect(() => {
    subscribe(
      { channel: `ChatChannel`, id: chatId },
      {
        received: ({ data }) => {
          setMessages((prevMessages) => [data, ...prevMessages]);
        },
      },
    );

    return () => {
      unsubscribe();
    };
  }, [chatId]);
   
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
    <div ref={dropDownRef} className="text-md p-4 border-1 dark:bg-gray-700 absolute top-20 right-0 rounded-sm z-100 divide-y">
      <p className="text-center font-semibold mb-2 p-2">Options</p>
      <div className="flex gap-2 items-center">
       
        <Link
          className="p-2 inline-flex items-center  gap-2 p-2 cursor-pointer w-full hover:bg-gray-200/50 hover:rounded-md"
          href={jsRoutes.destroyChatPath(chatId)}
          method="delete"
        >
          <Trash width="1rem" height="1rem" className="fill-red-700" />
          <p>Delete conversation</p>
          
        </Link>
         
      </div>
    </div>
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
