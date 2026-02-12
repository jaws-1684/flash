import React from "react";

function Error({ text, title }) {
  console.log(text, title);
  return (
    <div
      className="flex items-start p-2 sm:items-center text-sm text-red-800 text-strong rounded-md "
      role="alert"
    >
      <svg
        className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="font-medium me-1">
        {title} {text}
      </p>
    </div>
  );
}

export default Error;
