import { Link, router, usePage } from "@inertiajs/react";
import Logo from "../Icons/Logo";
import TextLogo from "../ui/TextLogo";
import ThemeToggle from "../Theme/ThemeToggle";
import Avatar from "../ui/Avatar";
import IconButton from "../ui/IconButton";
import { createContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Tabs from "../Tabs";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const AppContext = createContext(null)

function AppLayout({ children }) {
  const { current_user } = usePage().props;

  const scrollableRef = useRef(null)

  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 1000
  const isMessagesRoute = window.location.pathname.split("/").splice(-1) == "messages"

  return (
    <AppContext value={{scrollableRef}}>
    <div className="no-doc-scroll grow-1 max-h-dvh">
      <div className="panel flex px-2 py-2 item-center justify-between border-gray-200 border-b-1 dark:border-gray-700">
          <button
            className="logo flex cursor-pointer"
            onClick={() => router.visit("/chats")}
          >
            <Logo size="2em" className="fill-logo dark:fill-gray-200" />
            <TextLogo className="text-xl" />
          </button>

          <div className="flex gap-4 items-center">
            <Link href="/logout" method="delete">
              <FontAwesomeIcon className="text-gray-700 dark:text-gray-300" icon={faArrowRightFromBracket} />
            </Link>
            <ThemeToggle/>
            <IconButton>
            
              <Avatar
              avatar={current_user.avatar_image}
              alt={current_user.username + " image"}
              className="size-8 overflow-hidden"
              />
            </IconButton>
            
          </div>
        </div>
      <div className="flex scrollable flex-col lg:flex-row relative w-full lg:h-[95dvh]">
        
        <div className="w-full h-full">
          <div className="flex w-full h-full">
            {children}
          
          </div>
          {!isMessagesRoute && isMobile && <div className="px-2">
            <Tabs/>
          </div>}
          
        </div>
       
           {!isMobile && <Tabs/>}
        
       

      </div>
    </div>
    </AppContext>
  );
}
export default AppLayout;
