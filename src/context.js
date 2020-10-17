import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'

export const Context = createContext()

const Provider = ({ children }) => {

  const cookieToken = Cookies.get('token')

  const [isAuth, setIsAuth] = useState(cookieToken)
  
  const value = {
    isAuth,
    toggleAuth: (token) => {
      setIsAuth(true)
      Cookies.set('token', token, { expires: 1 })
    },
    logout: () => { 
      setIsAuth(false)
      Cookies.remove('token') 
    }
    
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default { Provider, Consumer: Context.Consumer }
