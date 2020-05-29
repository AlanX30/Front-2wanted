import React, { useState, useEffect } from 'react'
import './Styles/SalaReal.css'
import { Tree } from '../Components/Tree'
import { useChildsData }  from '../hooks/useChildsData'
import { useUserData }  from '../hooks/useUserData'
import axios from 'axios'

export const Room = (props) => {

    const { userData: {userName} } = useUserData()
    const token = window.sessionStorage.getItem('token')
    const salaId = props.match.params.salaId
    const [dataRoom, setDataRoom] = useState(false)
    const { arbolData, loading, acum3, acum4, acum5 } = useChildsData(salaId, dataRoom.price)

    useEffect(()=>{
        async function searchRoom(){
            const response = await axios({
                data: { salaId: salaId },
                method: 'post',
                url: 'http://localhost:3500/search/sala',
                headers: {
                    authorization: token
                    }
            })
            setDataRoom(response.data)  
        }
        searchRoom()
    },[salaId, token])

    const tAcum = acum3 + acum4 + acum5

    return (
        <>
            <div>
                <Tree token={token} userName={userName} salaName={dataRoom.name} price={dataRoom.price} salaId={dataRoom._id} arbolData={arbolData} loading={loading} />
            </div>
            <div>
                <p>Room Name:</p>
                <span>{dataRoom.name}</span>
                <p>Creator:</p>
                <span>{dataRoom.creator}</span>
                <p>Room Price:</p>
                <span>${dataRoom.price}</span>
                <p>Accumulated level 3:</p>
                <span>${acum3}</span>
                <p>Accumulated level 4:</p>
                <span>${acum4}</span>
                <p>Accumulated level 5:</p>
                <span>${acum5}</span>
                <p>Total accumulated:</p>
                <span>${tAcum}</span>
            </div>
        </>
    )
}