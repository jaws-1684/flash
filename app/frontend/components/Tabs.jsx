import React, { useState } from 'react'
import IconButton from './ui/IconButton'
import { router, usePage } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faComments } from '@fortawesome/free-solid-svg-icons'
import Plus, { Settings } from './Icons/AppIcons'
import Avatar from './ui/Avatar'



const classVariants = {
    base: "cursor-pointer grow-1 text-xs lg:text-sm dark:text-gray-200 text-gray-700 flex gap-1 flex-col lg:w-full lg:flex-col-reversse  items-center justify-between  lg:justify-center hover:rounded-full  lg:hover:rounded-lg dark:hover:bg-gray-700/50 hover:bg-gray-200/50 rounded-full lg:rounded-lg lg:p-1 p-2 lg:order-last ",
    svg: "dark:fill-gray-200 fill-gray-700",
    active: "bg-gray-200 dark:bg-gray-700",
   
}

const tabsVariants = {
    base: "sticky flex bottom-2 rounded-full ring ring-gray-200/50 dark:ring-gray-700/50 w-full justify-around items-center z-50 flex items-center p-2 gap-2 dark:bg-gray-500/95",
    lg: "lg:dark:bg-fgray lg:order-first lg:justify-start lg:rounded-xs lg:h-full lg:w-[70px] lg:flex-col lg:p-1 lg:gap-8",

}
export const TABS = {
    chats: 1,
    contacts: 2,
    new_group: 3,
    settings: 4
}
function Tabs() {
    const { current_user } = usePage().props;
    const [tab, setTab ] = useState(1)
    const activeTab = classVariants.base.concat(" ", classVariants.active)

    const visitAndSetTab = (tab, url) => {
        setTab(tab)
        router.visit(url)
    }

    return (
    <div className={Object.values(tabsVariants).join(" ")}>
         <IconButton
            className={tab == TABS.new_group ? activeTab : classVariants.base}
            onClick={() => visitAndSetTab(TABS.new_group, "/new_group")}
        >
            <Plus className={classVariants.svg} />
            <p>Groups</p>
        </IconButton>

        <IconButton
            className={tab == TABS.chats ? activeTab : classVariants.base}
            onClick={() => visitAndSetTab(TABS.chats, "/")}
            >
                <FontAwesomeIcon className={classVariants.svg} icon={faComments} />
            <p>Chats</p>
        </IconButton>

        <IconButton
            className={tab == TABS.contacts ? activeTab : classVariants.base}
            onClick={() => visitAndSetTab(TABS.contacts, "/contacts")}
            >
            <FontAwesomeIcon className={classVariants.svg} icon={faUserGroup} />
            <p>Contacts</p>
        </IconButton>

       

        <IconButton onClick={() => visitAndSetTab(TABS.settings, "/settings")}  className={tab == TABS.settings ? activeTab : classVariants.base}>
            <Settings
            width="1rem"
            height="1rem"
            className={classVariants.svg}
            />
            <p>Settings</p>
        </IconButton>
        <IconButton className={classVariants.base}>
            
            <Avatar
            avatar={current_user.avatar_image}
            alt={current_user.username + " image"}
            className="size-6"
            />
            <p>Profile</p>
        </IconButton>
       
    </div>
  )
}

export default Tabs