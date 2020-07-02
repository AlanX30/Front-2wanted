import { useEffect, useState } from 'react'
import axios from 'axios'

export const useChildsData = (salaId, userName) => {

    const token = window.sessionStorage.getItem('token')

    const [arbolData, setArbolData] = useState([])
            
    useEffect(()=>{

        async function childsData(){

            const response = await axios({
                method: 'post',
                data: {user: userName},
                url: `https://example2wanted.herokuapp.com/api/in-sala?id=${salaId}`,
                headers: {
                     authorization: token
                }
            })       
            
            const data = await response.data

            await setArbolData(data)

        }  
        childsData()
    },[salaId, userName, token])



    return {arbolData}

}
