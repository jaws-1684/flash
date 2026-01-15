import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "../routes/index";
import './index.css'

const router = createBrowserRouter(routes);
document.addEventListener("turbo:load", () => {
  const root = createRoot(
    document.body.appendChild(document.createElement("div"))
  );
 root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
});
