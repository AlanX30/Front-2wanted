import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import io from 'socket.io-client'
import { url } from './urlServer'

const socket = io(url)

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
      socket.emit('disconnectClient', Cookies.get('username'))
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

const contextExport = { Provider, Consumer: Context.Consumer }

export default contextExport