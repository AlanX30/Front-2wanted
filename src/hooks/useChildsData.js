import { useEffect, useState, useContext } from 'react'
import { url } from '../urlServer'
import { Context } from '../context'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useChildsData = (salaId, userName) => {

    const [arbolData, setArbolData] = useState([])
    const { csrfToken } = useContext(Context)
    const [loadingChildsData, setLoadingChildsData] = useState(true)
            
    useEffect(()=>{

        if(userName && csrfToken){
            setLoadingChildsData(true)
    
            async function childsData(){
    
                const response = await axios({
                    method: 'post',
                    url: `${url}/api/in-sala?id=${salaId}`,
                    headers: { 
                        'X-CSRF-Token': csrfToken
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
    },[salaId, userName, csrfToken])

    return {arbolData, loadingChildsData}

}
