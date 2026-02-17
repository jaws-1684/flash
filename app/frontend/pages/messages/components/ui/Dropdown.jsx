function Dropdown({ref, children, title, classes}) {
  return (
    <div ref={ref} className={`bg-white/80 text-black text-md p-4 border-1 dark:bg-gray-500/80 rounded-md border-gray-200 dark:border-gray-500 z-50 divide-y ${classes}`}>
      <p className="text-center font-semibold mb-2 p-2">{title}</p>
      <div className="flex gap-2 items-center">
       
        {children}
         
      </div>
    </div>
  )
}

export default Dropdown