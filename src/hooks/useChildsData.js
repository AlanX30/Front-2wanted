import { useEffect, useState } from 'react'
import axios from 'axios'

export const useChildsData = (salaId, price, userName) => {

    const token = window.sessionStorage.getItem('token')

    const [arbolData, setArbolData] = useState([])
    const [loading, setLoading] = useState(false)
            
    useEffect(()=>{

        async function childsData(){

            setLoading(true)

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

            setLoading(false)
        }  
        childsData()
    },[salaId, userName, token])

    console.log(arbolData)

    let acum3 = 0
    let acum4 = 0   

    for(let i = 6; i<=13; i++) {
        let divide = price/2   
        if(arbolData[i]){
            acum3 = acum3 + divide
        }
    }
    for(let i = 14; i<=29; i++){
        let divide = price/4  
        if(arbolData[i]){
            acum4 = acum4 + divide
        }
    }

    return {arbolData, loading, acum3, acum4}

}
