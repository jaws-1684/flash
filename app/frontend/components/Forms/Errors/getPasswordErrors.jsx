import React from "react";
import { useState } from "react";
import { passwordLengthIsValid } from "../Fields/PasswordField";
import { inputErrors } from "./inputErrors";

export function getPasswordErrors(
  password,
  passwordConfirmation = "",
  type = "password",
) {
  let errors = "";
  switch (type) {
    case "password":
      if (password != "" && !passwordLengthIsValid(password)) {
        errors = inputErrors.password.format;
      }
      break;
    case "passwordConfirmation":
      console.log("here");
      if (password != passwordConfirmation) {
        console.log("here if");
        errors = inputErrors.password.mismatch;
      }
      break;
  }

  return errors;
}
