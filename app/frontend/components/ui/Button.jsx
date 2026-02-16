import React from "react";

function Button(props) {
  const { children, color, ...rest } = props;
  const classes = {
    base: "button font-medium mt-1 mb-1 actions w-full flex justify-center p-2 rounded-md cursor-pointer",
    blue: "bg-blue-500 text-white  hover:bg-blue-400",
    gray: "bg-gray-900 dark:bg-gray-800 hover:bg-gray-700/40 hover:text-white text-gray-200",
  };
  return (
    <button
      type="button"
      className={classes.base.concat(" ", classes[color]) || ""}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
