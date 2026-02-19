import React from 'react'
import { formatTime } from '../lib/dateToWords'
import { Action } from '../pages/chats/components/Action'
import Name from '../pages/chats/components/ui/Name'
import { Link } from '@inertiajs/react'
import Avatar from './ui/Avatar'
import { truncate } from '../lib/truncate'

function ChatLink({chat, href, name}) {
  const last_message = chat?.last_message?.body
  const created_at = chat?.last_message?.created_at

  return (
    <Link key={chat.id} href={href}>
          <Action>
            <Avatar
              className="size-12"
              avatar={chat.avatar_image}
              alt="chat avatar"
            />

            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col">
                <Name name={name} />
                <p className="text-sm text-gray-700">{last_message ? truncate(last_message, 80) : ""}</p>
              </div>

              <p className="text-sm text-gray-700 p-1">{ created_at ? formatTime(created_at)  : ""}</p>
            </div>
          </Action>
        </Link>
  )
}

export default ChatLink