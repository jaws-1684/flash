import React from "react";
import { Link } from "@inertiajs/react";
import { jsRoutes } from "../../lib/paths";
import { memo } from "react";
export const Avatar = ({ avatar, alt }) => {
  return <img src={avatar} className="rounded-full w-12 h-12" alt={alt} />;
};
export const ChatName = ({ name }) => {
  return <h3 className="font-medium text-lg">{name}</h3>;
};

const classVariants = {
  base: "hover:bg-gray-100 dark:hover:bg-gray-100/10 hover:rounded-md",
  active: "bg-gray-100 dark:bg-gray-100/10 rounded-md",
};
export const ActionContainer = ({ onClick, children, variant = "base" }) => {
  return (
    <div
      className={`flex p-1 cursor-pointer ${classVariants[variant]}`}
      onClick={onClick}
    >
      <div className="flex w-full">
        <div className="w-full flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
};
const Chat = memo(({ chat }) => {
  return (
    <Link href={jsRoutes.chatMessagesPath(chat.id)}>
      <ActionContainer>
        <Avatar avatar={chat.avatar} alt="chat avatar" />

        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col">
            <ChatName name={chat.name} />
            <p className="text-sm text-gray-700">last_message</p>
          </div>

          <p className="text-sm text-gray-700 p-1">2:58</p>
        </div>
      </ActionContainer>
    </Link>
  );
});
export default Chat;
