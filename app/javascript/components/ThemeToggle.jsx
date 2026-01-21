import React, { useContext, useEffect, useState } from 'react'
import { Dark, Light } from './Icons/ThemeIcons'
import { ThemeContext } from './ThemeContext.jsx';



function ThemeToggle() {
   const {theme, setTheme} = useContext(ThemeContext)

    useEffect(() => {
    const refreshTheme = () => {
        localStorage.setItem("theme", theme);
    };

    refreshTheme();
    }, [theme]
  );
    return (<>
        {theme == "light" && 
            <button className="cursor-pointer" onClick={() => setTheme("dark")}>
                <Dark />
            </button>
        }

        {theme == "dark" && 
            <button className="cursor-pointer" onClick={() => setTheme("light")}>
                <Light/>
            </button>
        }
  
   
  </>
   
  )
}

export default ThemeToggle