import Avatar from "../../ui/Avatar"

function ImageUploadField({avatar, ref, label, onChange}) {
  return (
   <div className="flex gap-4 size-md mb-2">
            <Avatar className="size-24" avatar={avatar} alt="avatar"/>
            <div className="grow-1">
              <label class="block mb-2.5 text-sm font-medium text-heading" for="file_input">{label}</label>
              <input onChange={onChange} ref={ref} class="cursor-pointer flex mt-2 w-full border rounded-md py-2 px-3 focus:outline-hidden dark:bg-gray-700/50 dark:border-gray-500 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:ring-2 dark:focus:border-transparent" aria-describedby="file_input_help" id="file_input" type="file"/>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, or JPG.</p>
            </div>
           
          </div>
         
  )
}

export default ImageUploadField