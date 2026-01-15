import { Link } from "react-router";
import { useRouteError } from "react-router";
import React from "react";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
       <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
}