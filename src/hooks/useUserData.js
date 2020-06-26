import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUserData = () => {
    
    const token = window.sessionStorage.getItem('token')
    
    const [userData, setUserData] = useState({})
    
    useEffect(() => { 

        if(token){
            axios({
                method: 'get',
                url: 'http://localhost:3500/api/me',
                headers: {
                    authorization: token
                    }
            })
            .then(res => setUserData(res.data)) 
        } 
    }, [token])

    return { userData }
}
