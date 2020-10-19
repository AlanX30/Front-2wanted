import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'

export const Context = createContext()

const Provider = ({ children }) => {

  const cookieToken = Cookies.get('token')

  const [isAuth, setIsAuth] = useState(cookieToken)
  
  const value = {
    isAuth,
    toggleAuth: (token, userName) => {
      setIsAuth(true)
      Cookies.set('token', token, { expires: 1 })
      Cookies.set('username', userName, { expires: 1 })
    },
    logout: () => { 
      setIsAuth(false)
      Cookies.remove('token') 
      Cookies.remove('username') 
    }
    
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default { Provider, Consumer: Context.Consumer }
