import React, { useContext } from 'react'
import  { themeContext } from './context/ThemeContext';
import './app.css'
function App() {
  const {theme,settheme} = useContext(themeContext);
  return (
    <div>
      <main className={theme === "light" ? "light" : "dark"}>
        <h1>{theme}</h1>
        <button 
        onClick={()=>{settheme(prev=>prev==='light'?'bark':'light')}}
        >Click</button>

      </main>
    </div>
  )
}

export default App
