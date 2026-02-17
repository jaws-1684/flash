import React from "react";
import { Link } from "@inertiajs/react";
import { jsRoutes } from "../../../lib/paths";
import { Action } from "./Action";
import Name from "./ui/Name";
import Avatar from "../../../components/ui/Avatar";
import { formatTime } from "../../../lib/dateToWords";

function Contacts({ chats, favorite }) {
  console.log(chats)
  return (
    <>
      {favorite && (
        <Link key={favorite.id} href={jsRoutes.chatMessagesPath(favorite.id)}>
          <Action>
            <Avatar
              className="size-12"
              avatar={favorite.avatar}
              alt="chat avatar"
            />

            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col">
                <Name name="Saved" />
                <p className="text-sm text-gray-700">{favorite.last_message.body}</p>
              </div>

              <p className="text-sm text-gray-700 p-1">{formatTime(favorite.last_message.created_at)}</p>
            </div>
          </Action>
        </Link>
      )}
    
      {chats
        .filter((chat) => chat.id !== favorite?.id)
        .map((chat) => (
          <Link key={chat.id} href={jsRoutes.chatMessagesPath(chat.id)}>
            <Action>
              <Avatar
                className="size-12"
                avatar={chat.avatar}
                alt="chat avatar"
              />

              <div className="flex w-full items-start justify-between">
                <div className="flex flex-col">
                  <Name name={chat.name} />
                  <p className="text-sm text-gray-700">{chat.last_message.body}</p>
                </div>

                <p className="text-sm text-gray-700 p-1">{formatTime(chat.last_message.created_at)}</p>
              </div>
            </Action>
          </Link>
        ))}
    </>
  );
}

export default Contacts;
