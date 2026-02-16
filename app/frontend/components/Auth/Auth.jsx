import React, { Children } from "react";
import ThemeToggle from "../Theme/ThemeToggle";
import Logo from "../Icons/Logo";
import TextLogo from "../ui/TextLogo";
function Auth({ children }) {
  return (
    <div className="auth grow-1 p-4 flex flex-col">
      <div className="nav z-0 p-8 flex justify-between items-center">
        <div className="logo flex">
          <Logo size="2em" className="fill-logo dark:fill-gray-200" />
          <TextLogo className="text-xl" />
        </div>
        <div>{<ThemeToggle />}</div>
      </div>
      <div className="box z-10 flex flex-col justify-center items-center grow-1">
        <div className="auth rounded-lg p-8 h-max flex flex-col justify-center items-center ring shadow-xl ring-gray-900/5 dark:bg-gray-700/20  dark:border dark:border-gray-200/50">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Auth;
