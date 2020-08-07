import { useEffect, useState } from 'react'
import { url } from '../urlServer'
import axios from 'axios'

export const useChildsData = (salaId, userName) => {

    const token = window.sessionStorage.getItem('token')

    const [arbolData, setArbolData] = useState([])

    const [loadingChildsData, setLoadingChildsData] = useState(true)
            
    useEffect(()=>{

        setLoadingChildsData(true)

        async function childsData(){

            const response = await axios({
                method: 'post',
                data: {user: userName},
                url: `${url}/api/in-sala?id=${salaId}`,
                headers: {
                     authorization: token
                }
            })       
            
            const data = await response.data

            await setArbolData(data)

            setLoadingChildsData(false)

        }  
        childsData()
    },[salaId, userName, token])

    return {arbolData, loadingChildsData}

}
