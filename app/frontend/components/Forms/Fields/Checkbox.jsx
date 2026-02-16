import React from "react";
import FormField from "../FormField";
import { BASE_CLASSES } from "./BaseClasses";

function Checkbox({ onChange, name, text }) {
  return (
    <FormField>
      <div className="flex justify items-center">
        <input
          onChange={onChange}
          className="h-4 w-4 border-gray-300 rounded-sm"
          name={name}
          type="checkbox"
        />

        <label className={"ml-2" + " " + BASE_CLASSES.label} htmlFor="name">
          {text}
        </label>
      </div>
    </FormField>
  );
}

export default Checkbox;
