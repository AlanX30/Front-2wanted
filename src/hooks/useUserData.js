import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserData = (update) => {
    
    const token = window.sessionStorage.getItem('token')
    
    const [userData, setUserData] = useState({})
    
    useEffect(() => { 
        async function getUserData(){

        if(token){
            const response = await axios({
                method: 'get',
                url: 'https://example2wanted.herokuapp.com/api/me',
                headers: {
                    authorization: token
                    }
            })
            if(response.data){
                setUserData(response.data)
            }
        } 
    }
    getUserData()
    }, [token, update])
  

    return { userData }
}
