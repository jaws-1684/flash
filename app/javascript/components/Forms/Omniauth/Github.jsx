import React from "react";
import OmniauthPartial from "./OmniauthPartial";
import { Github as GithubIcon } from "../../Icons/OmniauthIcons";

function Github({ authenticity }) {
  return (
    <OmniauthPartial csrf_token={authenticity.csrf_token} provider="github">
      <GithubIcon />
    </OmniauthPartial>
  );
}

export default Github;
