import { useEffect, useState } from 'react'
import { url } from '../urlServer'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export const useChildsData = (salaId, userName) => {

    const token = Cookies.get('token')

    const [arbolData, setArbolData] = useState([])

    const [loadingChildsData, setLoadingChildsData] = useState(true)
            
    useEffect(()=>{

        if(userName){
            setLoadingChildsData(true)
    
            async function childsData(){
    
                const response = await axios({
                    method: 'post',
                    url: `${url}/api/in-sala?id=${salaId}`,
                    headers: {
                         authorization: token
                    }
                })       
                
                const data = await response.data

                if(data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.error,
                    })
                }
    
                await setArbolData(data)
    
                setLoadingChildsData(false)
    
            }  
            childsData()
        }
    },[salaId, userName, token])

    return {arbolData, loadingChildsData}

}
