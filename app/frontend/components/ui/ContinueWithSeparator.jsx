import React from "react";

function ContinueWithSeparator() {
  return (
    <div className="w-full flex py-2 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">Or continue with</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  );
}

export default ContinueWithSeparator;
