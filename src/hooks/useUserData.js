import { useState, useEffect } from 'react'
import { url } from '../urlServer'
import axios from 'axios'
import Cookies from 'js-cookie'

export const useUserData = (update) => {
    
    const token = Cookies.get('token')
    
    const [userData, setUserData] = useState({})
    const [loadingUserData, setLoadingUserData] = useState(false)
    const [usdBtc, setUsdBtc] = useState(0)
    
    useEffect(() => {
        
        setLoadingUserData(true)

        async function getUserData(){

            try{

                const response = await axios({
                    method: 'get',
                    url: url+'/api/me',
                    headers: {
                        authorization: token
                    }
                })
                if(response.data){
                    setUserData(response.data.userData)
                    setUsdBtc(response.data.usdBtc)
                    setLoadingUserData(false)
                }
                
            }catch(error){
                console.log('Internal Error')
            }
        }
        
        getUserData()
    }, [token, update])
    
    return { userData, loadingUserData, usdBtc }
}
