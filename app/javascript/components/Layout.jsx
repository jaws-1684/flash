import React, { useContext } from 'react'
import { useState } from 'react'
import { usePage } from '@inertiajs/react'
import Success from './Alerts/Success'
import { ThemeContext } from './ThemeContext.jsx'

export default function Layout({ title="Flash", children }) {
  const { flash } = usePage().props
  const {notice, alert} = flash
  const [toastOpen, setOpenToast] = useState({
    notice: true,
    alert: true
  })
  const [theme, setTheme] = useState(getTheme)
      
  return (<>
    <ThemeContext value={{theme, setTheme}}>
        <div className={theme}> 
          <title>{title}</title>
          <div className='notice z-50 absolute top-20 right-10  w-fit'>
            {notice && toastOpen.notice && <Success onClick={() => setOpenToast({...toastOpen, notice: false})} text={notice}/>}
          </div>
          
          {children}
        </div>
      </ThemeContext>
  </>
      
  )
}

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light");
    return "dark";
  } else {
    return theme;
  }
};