function Dropdown({ref, children, title, classes}) {
  return (
    <div ref={ref} className={`bg-white text-black text-md p-4 border-1 dark:bg-gray-700 rounded-sm z-100 divide-y ${classes}`}>
      <p className="text-center font-semibold mb-2 p-2">{title}</p>
      <div className="flex gap-2 items-center">
       
        {children}
         
      </div>
    </div>
  )
}

export default Dropdown