import React, { useState, useEffect } from 'react'
import './Styles/Room.css'
import { Tree } from '../Components/Tree'
import { useChildsData }  from '../hooks/useChildsData'
import { useUserData }  from '../hooks/useUserData'
import axios from 'axios'

export const Room = (props) => {

    const { userData: {userName} } = useUserData()
    const token = window.sessionStorage.getItem('token')
    const salaId = props.match.params.salaId
    const [dataRoom, setDataRoom] = useState(false)
    const { arbolData, loading, acum3, acum4 } = useChildsData(salaId, dataRoom.price, userName)

    useEffect(()=>{
        async function searchRoom(){
            const response = await axios({
                data: { salaId: salaId },
                method: 'post',
                url: 'http://localhost:3500/api/search/sala',
                headers: {
                    authorization: token
                }
            })
            setDataRoom(response.data.data)  
        }
        searchRoom()
    },[salaId, token])

    const tAcum = acum3 + acum4
    
    return (
        <div className='room'>
            <div>
                <div className='arbol-container'>
                    <Tree token={token} userName={userName} salaName={dataRoom.name} price={dataRoom.price} salaId={dataRoom._id} arbolData={arbolData} loading={loading} />
                </div>
            </div>    
            <div>
                <div className='room-details'>
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
                    <p>Total accumulated:</p>
                    <span>${tAcum}</span>
                </div>
            </div>    
        </div>
    )
}