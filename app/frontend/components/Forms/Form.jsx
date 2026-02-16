import React from "react";

function Form(props) {
  const { children, ...rest } = props;
  return (
    <form className="w-full" {...rest}>
      {children}
    </form>
  );
}

export default Form;
