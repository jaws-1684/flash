import React from "react";
import Logo from "../Icons/Logo";

function Bar({ title = "Your title" }) {
  return (
    <div className="col-span-full row-start-0 row-end-1 flex items-center justify-center p-1 border-b border-solid border-gray-300 dark:border-bgray gap-1 text-gray-200 text-sm font-medium bg-logo dark:bg-fblack select-none z-50 ">
      <Logo width={16} height={16} className="fill-white dark:fill-gray-400" />
      <p>{title}</p>
    </div>
  );
}

export default Bar;
