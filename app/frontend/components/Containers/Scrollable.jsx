import React from "react";

function Scrollable({ children, className = "", ...rest }) {
  return (
    <div className={`scrollable ${className} flex flex-col justify-between`} {...rest}>
      {children}
    </div>
  );
}

export default Scrollable;
