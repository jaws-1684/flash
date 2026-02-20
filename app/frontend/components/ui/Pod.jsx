import Title, { Header } from './Title'

const Pod = ({title, heading}) => {
   return(<div className="hidden w-3/4 lg:flex flex-col items-center justify-center">
        <div className="size-xl p-16 border border-gray-200 dark:border-gray-700 rounded-xl">
          <Title className="text-blue-800 text-7xl italic" text={title}/>
          <Header className="text-xl text-gray-700" text={heading}/>  
        </div>
       
      </div>)  
}

export default Pod