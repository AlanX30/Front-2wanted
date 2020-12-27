import React, { useState, useEffect } from 'react'
import './Styles/Room.css'
import Tree  from '../Components/Tree'
import RomDetails from '../Components/RomDetails'
import { useChildsData }  from '../hooks/useChildsData'
import { useUserData }  from '../hooks/useUserData'
import { url } from '../urlServer'
import axios from 'axios'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useCallback } from 'react'

export const Room = (props) => {
    
    const token = Cookies.get('token')
    const salaId = props.match.params.salaId
    const [parent, setParent] = useState('')
    const [inBalance, setInBalance] = useState(0)
    const [dataRoom, setDataRoom] = useState({})
    const [countUserData, setCountUserData] = useState(0)
    const { userData: {userName} } = useUserData()
    const { arbolData, loadingChildsData } = useChildsData(salaId, userName)
    
    const count = useCallback((data) => {
        if(count){
            setCountUserData(data)
        }
    },[])

    useEffect(()=>{
        async function searchRoom(){
            try {
                const response = await axios({
                    data: { salaId: salaId },
                    method: 'post',
                    url: url+'/api/search/sala',
                    headers: {
                        authorization: token
                    }
                })
                if(response.data.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.error,
                    })
                }else{
                    setInBalance(response.data.inBalance)
                    setParent(response.data.parentId)
                    setDataRoom(response.data.data)  
                }
            
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error,
                })
            }
        }
        searchRoom()

    },[userName, salaId, token, countUserData])

    
    if(!dataRoom || loadingChildsData){
        return <div className='loading-room'>
            <div className="spinner-border spiner-room text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }
    
    return (
        <div className='room'>
            <div>
                <div className='arbol-container'>
                    <Tree loading={loadingChildsData} token={token} userName={userName} salaName={dataRoom.name} price={dataRoom.price} salaId={dataRoom._id} arbolData={arbolData} />
                </div>
            </div>    
            <div>
                <RomDetails count={count} url={url} parent={parent} inBalance={inBalance} dataRoom={dataRoom} arbolData={arbolData} token={token} userName={userName} salaId={salaId}  />
            </div>    
        </div>
    )
}