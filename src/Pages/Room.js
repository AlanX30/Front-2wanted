import React, { useState, useEffect } from 'react'
import './Styles/Room.css'
import Swal from 'sweetalert2'
import { Tree } from '../Components/Tree'
import { useChildsData }  from '../hooks/useChildsData'
import { useUserData }  from '../hooks/useUserData'
import axios from 'axios'

export const Room = (props) => {

    const [loadingRoom, setLoadingRoom] = useState(true)
    const { userData: {userName} } = useUserData()
    const token = window.sessionStorage.getItem('token')
    const salaId = props.match.params.salaId
    const [dataRoom, setDataRoom] = useState(false)
    
    useEffect(()=>{
        async function searchRoom(){

            try {
                const response = await axios({
                    data: { salaId: salaId },
                    method: 'post',
                    url: 'https://example2wanted.herokuapp.com/api/search/sala',
                    headers: {
                        authorization: token
                    }
                })
                if(response.data.error){
                    const error = response.data.error.name === 'CastError' ? 'Esta Sala no existe' : response.data.error.name
                    setLoadingRoom(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error,
                    })
                }else{
                    setLoadingRoom(false)
                    setDataRoom(response.data.data)  
                }
            }catch(error){
                setLoadingRoom(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            }
        }
        searchRoom()
    },[salaId, token])

    const { arbolData } = useChildsData(salaId, userName)
    
    const price = dataRoom ? dataRoom.price : 0

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

    const tAcum = acum3 + acum4
 
    if(loadingRoom){
        return <div className='loading-room'>
            <div className="spinner-border spiner-room text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

    if(!dataRoom){
        return <div></div>
    }
    
    return (
        <div className='room'>
            <div>
                <div className='arbol-container'>
                    <Tree token={token} userName={userName} salaName={dataRoom.name} price={dataRoom.price} salaId={dataRoom._id} arbolData={arbolData} />
                </div>
            </div>    
            <div>
                <div className='room-details'>
                    <p>Nombre de sala:</p>
                    <span>{dataRoom.name}</span>
                    <p>Creador:</p>
                    <span>{dataRoom.creator}</span>
                    <p>Valor de sala:</p>
                    <span>${dataRoom.price}</span>
                    <p>Acomulado en nivel 3:</p>
                    <span>${acum3}</span>
                    <p>Acomulado en nivel 4:</p>
                    <span>${acum4}</span>
                    <p>Total acomulado:</p>
                    <span>${tAcum}</span>
                </div>
            </div>    
        </div>
    )
}