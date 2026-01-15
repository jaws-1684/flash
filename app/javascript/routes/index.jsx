import React from "react";
import ErrorPage from "./ErrorPage";
import App from "../components/App";
import Chats from "../components/Chats";
// import loader

const routes = [
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    // loader: loader,
     HydrateFallback: () => null,
     children: [
        { path: "/chats", element: <Chats />},
    ],
  },
];

export default routes;