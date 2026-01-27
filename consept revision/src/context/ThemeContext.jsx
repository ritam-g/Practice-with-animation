import { createContext, useState } from "react";
export const themeContext = createContext();
function ThemeContext({children}) {
    const [theme, settheme] = useState('light')
  return (
    <themeContext.Provider
    value={{theme,settheme}}
    >
      {children}
    </themeContext.Provider>
  )
}

export default ThemeContext
