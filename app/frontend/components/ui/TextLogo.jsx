import React from "react";

function TextLogo(props) {
  return (
    <>
      <h2
        className={
          "font-bold font-roboto dark:text-gray-200 text-logo " +
          props?.className
        }
      >
        Flash
      </h2>
    </>
  );
}

export default TextLogo;
