import React from "react";

function Scrollable({ children, className = "", ...rest }) {
  return (
    <div className={`scrollable ${className}`} {...rest}>
      {children}
    </div>
  );
}

export default Scrollable;
