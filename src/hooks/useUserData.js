import {useCallback, useState, useEffect } from 'react'
import { url } from '../urlServer'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useUserData = (update) => {
    
    const token = Cookies.get('token')
    
    const [userData, setUserData] = useState({})
    const [loadingUserData, setLoadingUserData] = useState(false)

    
    useEffect(() => {
        
        setLoadingUserData(true)

        async function getUserData(){

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

    getUserData()
    }, [token, update])
  

    return { userData, loadingUserData }
}
