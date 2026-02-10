import { Magnifier } from "../../../components/Icons/AppIcons";
import Close from "../../../components/Icons/Close";

const SearchMessage = ({children}) => <h2 className='text-center text-sm text-gray-500'>{children}</h2>

export function Loading() {
    return <SearchMessage>We are searching for contacts, please wait</SearchMessage>;
}
export function NotFound() {
    return <SearchMessage>Sorry, we couldn't find any contacts</SearchMessage>;
}

function Search({searchTerm, setSearchTerm, placeholder}) {
  return (
        <div className='relative my-4 w-full'>
            <div className='relative'>
                <input placeholder={placeholder}
                className="truncate w-full pl-8 border-0 rounded-full p-2 tracking-tight bg-gray-200/40 dark:color-white dark:placeholder-gray-400 dark:focus-bg-gray-500 dark:bg-gray-500" id='search' type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            </div>
            <button className='absolute inset-y-0 start-2'><Magnifier className="fill-gray-700"/></button>
            {searchTerm && <button className="absolute inset-y-0 end-5" onClick={() => setSearchTerm("")}><Close className="fill-gray-700"/></button>}
        </div>   
  )
}
export default Search