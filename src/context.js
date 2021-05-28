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
  const [isAdminAuth, setIsAdminAuth] = useState(Cookies.get('conectedAdmin'))
  const [csrfToken, setCsrfToken] = useState(null)

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

  const [userData, setUserData] = useState({})
  const [loadingUserData, setLoadingUserData] = useState(false)
  const [usdBtc, setUsdBtc] = useState(0)
  const [update, setUpdate] = useState(0)

  async function onLogout(){
    try {
        const response = await axios({
            method: 'post',
            url: url+'/api/logout',
            headers: { 
              'X-CSRF-Token': csrfToken
            }
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

  async function onAutoLogout(){
    try {

        const response = await axios({
            method: 'post',
            data: {username: Cookies.get('username') },
            url: url+'/api/autologout',
            headers: { 
              'X-CSRF-Token': csrfToken
            }
        })
        if(response.data.error){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.error,
          })
        }

        Cookies.remove('username')

    }catch(error){
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
      })
    }
  }

  useEffect(() => {
    async function getUserData(){

        setLoadingUserData(true)

        const response = await axios({
          method: 'post',
          url: url+'/api/me',
          headers: { 
              'X-CSRF-Token': csrfToken
          }
        })
        if(response.data.error){ 
          axios({
            method: 'post',
            url: url+'/api/logout',
            headers: { 
              'X-CSRF-Token': csrfToken
            }
          }).then(()=>{
            Cookies.remove('conected') 
            Cookies.remove('username')
            window.location.replace('/') 
          })
        }
        if(response.data){
            setUserData(response.data.userData)
            setUsdBtc(response.data.usdBtc)
            setLoadingUserData(false)
        }
      }
    
     if(csrfToken && isAuth){getUserData()} 

  },[csrfToken, update, isAuth])
  
  const value = {
    isAuth,
    isAdminAuth,
    csrfToken,
    userData,
    loadingUserData,
    usdBtc,
    onUpdate:(update)=>{setUpdate(update)},
    toggleAuth:(userName)=>{
      setIsAuth(true)
      Cookies.set('username', userName)
      Cookies.set('conected', true, { expires: 0.041660 })
    },
    toggleAdminAuth:()=>{
      setIsAdminAuth(true)
      Cookies.set('conectedAdmin', true, { expires: 0.00694444 })
    },
    logout: () => { 
      socket.emit('disconnectClient', Cookies.get('username'))
      onLogout()
      setIsAuth(false)
      Cookies.remove('conected') 
      Cookies.remove('username') 
    },
    autoLogout: () => { 
      socket.emit('disconnectClient', Cookies.get('username'))
      onAutoLogout()
      setIsAuth(false)
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