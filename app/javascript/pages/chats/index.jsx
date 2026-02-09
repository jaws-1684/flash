import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Layout from '../../components/Layouts/Layout'
import Bar from '../../components/ui/Bar';
import ThemeToggle from '../../components/Theme/ThemeToggle';
import IconButton from '../../components/ui/IconButton';
import Welcome from '../../components/Chats/Welcome';
import TextLogo from '../../components/ui/TextLogo';
import { useDebouncedGet } from '../../components/hooks/useDebouncedGet';
import ContactSearch from '../../components/Chats/ContactSearch';
import ChatsArea from '../../components/Chats/ChatsArea';
import { jsRoutes } from '../../paths';
import Scrollable from '../../components/Containers/Scrollable';

export const MIN_WIDTH = 800

export default function Chats({chats}) {
  console.log(chats)
  console.count('Chats render')
  const { current_user } = usePage().props

  const [searchTerm, setSearchTerm] = useState("")
  const [contacts, contactsLoading] = [[], true]
  // const [contacts, contactsLoading] = useDebouncedGet({
  //   query: searchTerm,
  //   fn: jsRoutes.searchPath
  // })

  return (
    <div className='grid grid-cols-6 grid-rows-12 lg:grid-cols-12 grow-1 max-w-screen max-h-dvh no-doc-scroll'>
      
      <Bar title="Chats"/>

      <div className='flex flex-col md:flex-row bg-gray-200 col-start-1 col-span-full row-span-full divide-x divide-gray-300 dark:divide-bgray'>
        
        <div className='panel dark:bg-fblack p-2 flex md:flex-col item-center justify-start'>
            <ThemeToggle/>
            <IconButton>
              C
            </IconButton>
            <IconButton>
              C
            </IconButton>
       
            <Link href="/logout" method="delete">Log out</Link>
        </div>

      
       
          <div className='area bg-white dark:bg-fgray w-full lg:w-[30%] p-4 gap-2 h-full'>
            
            <div className='h-content w-full'>
               <TextLogo className="p-2 text-3xl subpixel-antialiased tracking-tight select-none mb-4"/>
               <ContactSearch 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                loading={contactsLoading} 
                contacts={contacts}
              />
            </div>
            {chats && <ChatsArea chats={chats}/>}     
            {/* {!searchTerm && <Scrollable opts='h-[80%] lg:h-[85%]'>
              { chats
                ? 
                : <Welcome currentUser={current_user}/>
              }
            </Scrollable>} */}
             
          </div>

       
      </div>  

    </div>
  )
}

Chats.layout = (page) => <Layout children={page} title="Chats" />


