import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'

export const Header = () => {
const[theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")||"light"))

useEffect(()=>{
    localStorage.setItem("theme", JSON.stringify(theme))
    
      document.documentElement.removeAttribute("class");
      document.documentElement.classList.add(theme);
    
    },[theme])

  return (
    <header>
        <div className='logo'>
             <img src={Logo} alt="logo" />
             <span>MovieMate</span>
        </div>
        <div className='themeSelector'>
            <span onClick={()=> setTheme("light")} className={theme === "light"?"light activeTheme":"light"}></span>
            <span onClick={()=> setTheme("medium")} className={theme === "medium"?"medium activeTheme":"medium"}></span>
            <span onClick={()=> setTheme("dark")} className={theme === "dark"?"dark activeTheme":"dark"}></span>
            <span onClick={()=> setTheme("gradiant1")} className={theme === "gradiant1"?"gradiant1 activeTheme":"gradiant1"}></span>
            <span onClick={()=> setTheme("gradiant2")} className={theme === "gradiant2"?"gradiant2 activeTheme":"gradiant2"}></span>
            <span onClick={()=> setTheme("gradiant3")} className={theme === "gradiant3"?"gradiant3 activeTheme":"gradiant3"}></span>
        </div>
    </header>
  )
}
