import React from 'react'
import Search from "./Search"
const SearchMessage = ({children}) => <h2>{children}</h2>

function Loading() {
    return <SearchMessage>We are searching for contacts, please wait</SearchMessage>;
}
function NotFound() {
    return <SearchMessage>Sorry, we couldn't find any contacts</SearchMessage>;
}

function ContactResults({contacts, loading, searchTerm, setSearchTerm}) {
  let result;
  if (loading) {
    result =  <Loading/> 
  } else if (!loading && contacts != 404) {
    result = <div>Contacts</div>
  } else if (contacts === 404) {
    result = <NotFound/>
  }
  return (
    <> 
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        {searchTerm && <div className='border-b border-gray-200'>
            {result}
        </div> } 
       
     
    </>
   
  )
}

export default ContactResults