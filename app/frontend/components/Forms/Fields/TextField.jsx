import React from "react";
import FormField from "../FormField";
import { BASE_CLASSES } from "./BaseClasses";
import Error from "../../Error";

export const validText = (minlength, maxlength, value) => {
  let result;
  if (value.length == 0) {
    result = null;
  } else if (value.length < minlength) {
    result = "min";
  } else if (value.length > maxlength) {
    result = "max";
  } else {
    result = "ok";
  }
  return result;
};

function TextField(props) {
  const {
    onChange,
    name = "text",
    placeholder = "Enter your text",
    label = "text",
    value = "",
    minlength = 6,
    maxlength = 50,
    ...rest
  } = props;

  let resultClasses = BASE_CLASSES.base;

  const textError = validText(minlength, maxlength, value);
  if (textError == "ok") {
    resultClasses = resultClasses.concat(" ", BASE_CLASSES.valid);
  } else if (textError != null) {
    resultClasses = resultClasses.concat(" ", BASE_CLASSES.invalid);
  }

  const errors = {
    minlength: `minimum length is ${minlength} characters.`,
    maxlength: `maximum length is ${maxlength} characters.`,
  };
  return (
    <FormField>
      <label className={BASE_CLASSES.label} htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        className={resultClasses}
        autoComplete={name}
        id={name}
        type="text"
        value={value}
        placeholder={placeholder}
        {...rest}
      />

      {textError == "min" && <Error title={label} text={errors.minlength} />}
      {textError == "max" && <Error title={label} text={errors.maxlength} />}
    </FormField>
  );
}

export default TextField;
