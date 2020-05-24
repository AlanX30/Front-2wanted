import React, { createContext, useState } from 'react'

export const Context = createContext()

const Provider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(window.sessionStorage.getItem('token'))

  const value = {
    isAuth,
    toggleAuth: (token) => {
      setIsAuth(true)
      window.sessionStorage.setItem('token', token)
    },
    logout: () => { 
      setIsAuth(false)
      window.sessionStorage.removeItem('token') 
    }
    
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default { Provider, Consumer: Context.Consumer }
