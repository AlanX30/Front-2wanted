import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserData = () => {
    
    const token = window.sessionStorage.getItem('token')
    
    const [userData, setUserData] = useState({})
    
    useEffect(() => { 

        if(token){
            axios({
                method: 'get',
                url: 'https://example2wanted.herokuapp.com/api/me',
                headers: {
                    authorization: token
                    }
            })
            .then(res => {
                if(res.data) {
                    setUserData(res.data)
                }
            })
        } 
    }, [token])
  

    return { userData }
}
