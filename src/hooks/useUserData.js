import { useContext, useState, useEffect } from 'react'
import { Context } from '../context'
import { url } from '../urlServer'
import axios from 'axios'

export const useUserData = (update) => {
    
    const { csrfToken } = useContext(Context)
    const [userData, setUserData] = useState({})
    const [loadingUserData, setLoadingUserData] = useState(false)
    const [usdBtc, setUsdBtc] = useState(0)
    console.log(csrfToken)
    
    useEffect(() => {
        
        setLoadingUserData(true)

        async function getUserData(){

            try{
                if(csrfToken){ 
                    const response = await axios({
                    method: 'post',
                    url: url+'/api/me',
                    headers: { 
                        'X-CSRF-Token': csrfToken
                    }
                })
                if(response.data){
                    setUserData(response.data.userData)
                    setUsdBtc(response.data.usdBtc)
                    setLoadingUserData(false)
                }
                }
                
            }catch(error){
                console.log('Internal Error')
            }
        }
        
        getUserData()
    }, [update, csrfToken])
    
    return { userData, loadingUserData, usdBtc }
}
