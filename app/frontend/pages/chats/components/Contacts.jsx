import React from "react";
import { jsRoutes } from "../../../lib/paths";
import ChatLink from "../../../components/ChatLink";
import { Header } from "../../../components/ui/Title";

function Contacts({ chats, groupChats, favorite }) {
 
  const saved = favorite && <ChatLink key={favorite.id} avatar={favorite.recipient.avatar_image} chat={favorite} name="Saved" href={jsRoutes.chatMessagesPath(favorite.id)}/>

  const groups = groupChats?.length ? <>
      <Header text="Groups" className="text-gray-700 ml-2"/>
      {groupChats.map((chat) => (<ChatLink key={"group-"+chat.id} avatar={chat.avatar_image} chat={chat} name={chat?.name} href={jsRoutes.groupChatMessagesPath(chat.slug)}/>))}
  </> : null

  const chats_block = chats?.length ? <>
     <Header text="Chats" className="text-gray-700 ml-2"/>
     {chats
        .map((chat) => ( <ChatLink key={"chat-"+chat.id} chat={chat} avatar={chat.recipient.avatar_image} name={chat?.recipient?.username} href={jsRoutes.chatMessagesPath(chat.id)}/>))}
  </> : null
  return (
    <div className="flex flex-col">
      {saved}

      {groups}
         
      {chats_block}
  
    </div>
  );
}

export default Contacts;
