import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import IconButton from "../ui/IconButton";
import Logo from "../Icons/Logo";
import TextLogo from "../ui/TextLogo";
import Avatar from "../ui/Avatar";
import { Settings } from "../Icons/AppIcons";
import ThemeToggle from "../Theme/ThemeToggle";

function AppLayout({ children }) {
  const { current_user } = usePage().props;

  return (
    <div className="grow-1 px-4 flex justify-center no-doc-scroll max-h-screen">
      <div className="w-full flex flex-col lg:w-[50%] relative">
        <div className="panel flex py-4 item-center justify-between border-gray-200 border-b-1 dark:border-gray-700">
          <button
            className="logo flex cursor-pointer"
            onClick={() => router.visit("/chats")}
          >
            <Logo size="2em" className="fill-logo dark:fill-gray-200" />
            <TextLogo className="text-xl" />
          </button>

          <div className="flex gap-4 items-center">
            <ThemeToggle/>
            <IconButton onClick={() => router.visit("/settings")}>
              <Settings
                width="1.3rem"
                height="1.3rem"
                className="fill-fblack dark:fill-gray-200"
              />
            </IconButton>

            <Avatar
              avatar={current_user.avatar}
              alt={current_user.username + " image"}
              className={"size-8 overflow-hidden"}
            />
          </div>
        </div>
        <div className="h-[80dvh] lg:h-[85dvh]">{children}</div>
      </div>
    </div>
  );
}
export default AppLayout;
