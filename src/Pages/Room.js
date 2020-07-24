import React, { useState, useEffect } from 'react'
import './Styles/Room.css'
import Swal from 'sweetalert2'
import { Tree } from '../Components/Tree'
import { useChildsData }  from '../hooks/useChildsData'
import { useUserData }  from '../hooks/useUserData'
import axios from 'axios'

export const Room = (props) => {

    const [loadingRoom, setLoadingRoom] = useState(true)
    const [parent, setParent] = useState('')
    const token = window.sessionStorage.getItem('token')
    const salaId = props.match.params.salaId
    const [dataRoom, setDataRoom] = useState(false)

    
    const { userData: {userName} } = useUserData()
    
    function formatNumber(number){
        return new Intl.NumberFormat("de-DE").format(number)
    }

    useEffect(()=>{
        
        async function searchRoom(){
            try {
                if(userName){
                    const response = await axios({
                        data: { salaId: salaId, username: userName },
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
                    setParent(response.data.parentId)
                    setDataRoom(response.data.data)  
                }
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
    },[userName, salaId, token])

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
                    <p>Valor de sala:</p>
                    <span>${formatNumber(dataRoom.price)}</span>
                    <p>Tu usuario padre:</p>
                    <span>{parent}</span>
                    <p>Creador:</p>
                    <span>{dataRoom.creator}</span>
                    <p>Acomulado en nivel 3:</p>
                    <span>${formatNumber(acum3)}</span>
                    <p>Acomulado en nivel 4:</p>
                    <span>${formatNumber(acum4)}</span>
                    <p>Total acomulado:</p>
                    <span>${formatNumber(tAcum)}</span>
                </div>
            </div>    
        </div>
    )
}