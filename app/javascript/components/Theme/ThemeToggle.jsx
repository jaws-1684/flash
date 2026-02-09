import React, { useContext, useEffect } from 'react'
import { Dark, Light } from '../Icons/ThemeIcons.jsx'
import { ThemeContext } from './ThemeContext.jsx';
import IconButton from '../ui/IconButton.jsx';


function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext)

    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem("theme", theme);
        };

        refreshTheme();
    }, [theme]
    );
    return (<>
        {theme == "light" &&
            <IconButton onClick={() => setTheme("dark")}>
                <Dark />
            </IconButton>
        }

        {theme == "dark" &&
            <IconButton onClick={() => setTheme("light")}>
                <Light />
            </IconButton>
        }


    </>

    )
}

export default ThemeToggle