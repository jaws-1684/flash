import React from "react";

function Title({ text, className }) {
  return <h2 className={"text-4xl font-bold mb-8".concat(" ", className)}>{text}</h2>;
}

export default Title;
