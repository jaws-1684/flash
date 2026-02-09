import React, {useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import IconButton from '../ui/IconButton'
import Logo from '../Icons/Logo'
import TextLogo from '../ui/TextLogo'
import Avatar from '../ui/Avatar'
import { Settings} from '../Icons/AppIcons'

function AppLayout({children}) {
  const { current_user } = usePage().props
  
  return (
    <div className='flex flex-col grow-1 max-w-screen px-4 lg:px-50 mt-4'>
          <div className='panel flex p-2 item-center justify-between'>
              <div className="logo flex">
                <Logo size="2em" className="fill-logo dark:fill-gray-200"/>
                <TextLogo className="text-xl"/>
              </div>
   
             <div className='flex gap-4 items-center'>
            
                <IconButton onClick={() => router.visit("/settings")}>
                  <Settings width="1.3rem" height="1.3rem" className="fill-fblack dark:fill-gray-200"/>
                </IconButton>
                
                    
            
                <Avatar avatar={current_user.avatar} alt={current_user.username + " image"} className={"size-8"}/>
               
             </div>
           </div>
           {children}
    </div>
  )
}
export default AppLayout
