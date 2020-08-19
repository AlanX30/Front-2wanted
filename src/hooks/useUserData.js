import { useState, useEffect } from 'react'
import { url } from '../urlServer'
import axios from 'axios'

export const useUserData = (update) => {
    
    const token = window.sessionStorage.getItem('token')
    
    const [userData, setUserData] = useState({})
    const [loadingUserData, setLoadingUserData] = useState(false)
    
    useEffect(() => { 

        setLoadingUserData(true)

        async function getUserData(){

        if(token){
            const response = await axios({
                method: 'get',
                url: url+'/api/me',
                headers: {
                    authorization: token
                    }
            })
            if(response.data){
                setUserData(response.data)
                setLoadingUserData(false)
            }
        } 
    }
    getUserData()
    }, [token, update])
  

    return { userData, loadingUserData }
}
