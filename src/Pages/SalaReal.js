import React, { useEffect } from 'react'
import axios from 'axios'

export const SalaReal = (props) => {

    const token = window.sessionStorage.getItem('token')
    const salaId = props.match.params.salaId

    console.log(salaId)

    useEffect(() => { 

        if(token){
            axios({
                method: 'get',
                url: `http://localhost:3500/sala?id=${salaId}`,
                headers: {
                    authorization: token
                    }
            })
        } 
    }, [token, salaId])

    return(
        <>
            <h1>Algo</h1>
        </>
    )
}