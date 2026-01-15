import React, { createContext, useState } from "react"
import "./App.css"
import { Outlet, useLoaderData } from "react-router-dom"

function App() {
  // const { } = useLoaderData()
  
  return (
    <div className="app-wrapper">
      <Outlet context={{}}/>
    </div>)
}

export default App