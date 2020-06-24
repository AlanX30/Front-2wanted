import { useEffect, useState } from 'react'
import axios from 'axios'

export const useChildsData = (salaId, price) => {

    const token = window.sessionStorage.getItem('token')

    const [arbolData, setArbolData] = useState([])
    const [loading, setLoading] = useState(false)
            
    useEffect(()=>{

        async function childsData(){

            setLoading(true)

            const response = await axios({
                method: 'get',
                url: `http://localhost:3500/sala?id=${salaId}`,
                headers: {
                     authorization: token
                }
            })
                    
            const data = await response.data
            
            let childList = []

            for(let i = 0; i<data.length; i++){
                
                if(data[i] === null){
                    data[i] = {userName: ''}
                }
                childList.push(data[i].userName)
            }

            await setArbolData(childList)

            setLoading(false)
        }  
        childsData()
    },[salaId, token])

    let acum3 = 0
    let acum4 = 0   

    for(let i = 6; i<=13; i++){
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
