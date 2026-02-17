import React from "react";
import { BASE_CLASSES } from "./BaseClasses";
import FormField from "../FormField";
import Eye from "../Eye";
import { useRef } from "react";
import Error from "../../Error";

export const passwordLengthIsValid = (password) => password.length >= 6;
function PasswordField({
  onChange,
  children,
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  value = "",
  error = "",
  ...rest
}) {
  const inputRef = useRef(null);
  return (
    <FormField>
      <div className="container flex items-center justify-between gap-8">
        <div className="label">
          <label className={BASE_CLASSES.label} htmlFor={name}>
            {label}
          </label>
        </div>
        {children ? <div className="link">{children}</div> : ""}
      </div>
      <div className="relative">
        <div className="mt-2 relative rounded-md shadow-xs">
          <input
            onChange={onChange}
            ref={inputRef}
            className={BASE_CLASSES.base}
            name={name}
            type="password"
            value={value}
            placeholder={placeholder}
            {...rest}
          />
        </div>
        <button className="z-50 absolute inset-y-0 end-0">
          <Eye inputRef={inputRef} />
        </button>
      </div>
      {error && <Error title={label.split(" ")[0]} text={error} />}
    </FormField>
  );
}

export default PasswordField;
