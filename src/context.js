import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import axios from 'axios'
import io from 'socket.io-client'
import { url } from './urlServer'

const socket = io(url)

export const Context = createContext()

const Provider = ({ children }) => {
  
  const [isAuth, setIsAuth] = useState(Cookies.get('conected'))
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    async function generateCsrf(){

      try{

        const response = await axios.get(url+'/api/csrf')
        setCsrfToken(response.data.csrfToken)
  
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error
        })
      }

    }
    generateCsrf()
  },[])

  async function onLogout(){
    try {
        const response = await axios({
            method: 'post',
            url: url+'/api/logout'
        })
        if(response.data.error){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.error,
          })
        }
    }catch(error){
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
      })
    }
  }
  
  const value = {
    isAuth,
    csrfToken,
    toggleAuth: (userName) => {
      setIsAuth(true)
      Cookies.set('username', userName, { expires: 1 })
      Cookies.set('conected', true, { expires: 1 })
    },
    logout: () => { 
      socket.emit('disconnectClient', Cookies.get('username'))
      onLogout()
      setIsAuth(false)
      Cookies.remove('conected') 
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